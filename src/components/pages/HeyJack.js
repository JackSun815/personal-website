import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import ReactMarkdown from 'react-markdown';
import './HeyJack.css';

const HeyJack = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('heyjack_authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      // Focus password input when component mounts
      setTimeout(() => passwordInputRef.current?.focus(), 100);
    }
  }, []);

  // Check for API key on mount (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      if (!apiKey) {
        setError('OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your .env file and restart the dev server.');
      }
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const correctPassword = process.env.REACT_APP_HEYJACK_PASSWORD || 'jack';
    
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      localStorage.setItem('heyjack_authenticated', 'true');
      inputRef.current?.focus();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
      passwordInputRef.current?.focus();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMessages([]);
    setError(null);
    setPasswordInput('');
    localStorage.removeItem('heyjack_authenticated');
    setTimeout(() => passwordInputRef.current?.focus(), 100);
  };

  // Web search function using DuckDuckGo Instant Answer API (free, no API key)
  // For production, consider using SerpAPI, Google Custom Search, or other search APIs
  const performWebSearch = async (query) => {
    try {
      // Use DuckDuckGo Instant Answer API
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      let results = [];
      
      // Extract Abstract
      if (data.AbstractText) {
        results.push(`Abstract: ${data.AbstractText}`);
      }
      
      // Extract Answer
      if (data.Answer) {
        results.push(`Answer: ${data.Answer}`);
      }
      
      // Extract Definition
      if (data.Definition) {
        results.push(`Definition: ${data.Definition}`);
      }
      
      // Extract Related Topics
      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        const topics = data.RelatedTopics
          .slice(0, 5)
          .filter(topic => topic.Text)
          .map((topic, idx) => `${idx + 1}. ${topic.Text}`)
          .join('\n');
        if (topics) {
          results.push(`Related Topics:\n${topics}`);
        }
      }
      
      // Extract Results (search results)
      if (data.Results && data.Results.length > 0) {
        const searchResults = data.Results
          .slice(0, 3)
          .map((result, idx) => `${idx + 1}. ${result.Text} - ${result.FirstURL}`)
          .join('\n');
        if (searchResults) {
          results.push(`Search Results:\n${searchResults}`);
        }
      }
      
      // If we have results, return them
      if (results.length > 0) {
        return results.join('\n\n');
      }
      
      // Fallback: return a message indicating search was performed
      return `Web search performed for: "${query}". Found limited results from DuckDuckGo Instant Answer API. For more comprehensive results, consider using a dedicated search API service.`;
    } catch (error) {
      console.error('Web search error:', error);
      return `Error performing web search for "${query}": ${error.message}. The model will use its knowledge to provide the best answer possible.`;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Add empty assistant message that we'll update as we stream
    const assistantMessageId = Date.now();
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '',
      id: assistantMessageId 
    }]);

    try {
      // Get API key from environment variable
      // Note: For production, use a backend proxy to hide your API key
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your .env file');
      }

      // Use gpt-4o by default (supports function calling and web browsing)
      // You can set REACT_APP_OPENAI_MODEL=gpt-4o or gpt-4-turbo in .env
      // For web browsing, use gpt-4o, gpt-4-turbo, or newer models
      const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';

      // Some models (like gpt-5, o1 series) only support default temperature (1)
      // Models that don't support custom temperature values
      // Order matters: check longer names first (e.g., "o1-preview" before "o1")
      const modelsWithoutTemperature = ['gpt-5', 'o1-preview', 'o1-mini', 'o1'];
      // Check if model name matches or starts with any of the restricted model names
      const includeTemperature = !modelsWithoutTemperature.some(m => 
        model === m || model.startsWith(m + '-') || model.startsWith(m + '.')
      );

      const requestBody = {
        model: model,
        messages: [
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          userMessage
        ],
        stream: true, // Enable streaming
        tools: [
          {
            type: 'function',
            function: {
              name: 'web_search',
              description: 'Search the web for current information, news, recent events, or any information that requires up-to-date data. Use this when asked about recent events, current news, latest information, or anything that might have changed recently.',
              parameters: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'The search query to look up on the web'
                  }
                },
                required: ['query']
              }
            }
          }
        ],
        tool_choice: 'auto' // Let the model decide when to use web search
      };

      // Only include temperature if the model supports it
      if (includeTemperature) {
        requestBody.temperature = 0.7;
      }

      let response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      // Check if response is OK before trying to stream
      if (!response.ok) {
        // Try to parse error as JSON (non-streaming errors)
        try {
          const errorData = await response.json();
          const errorMessage = errorData.error?.message || '';
          
          if (errorMessage.includes('temperature') && includeTemperature) {
            // Retry without temperature parameter
            delete requestBody.temperature;
            response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
              const retryErrorData = await response.json();
              throw new Error(retryErrorData.error?.message || errorMessage || 'Failed to get response from OpenAI');
            }
          } else {
            throw new Error(errorMessage || 'Failed to get response from OpenAI');
          }
        } catch (parseError) {
          // If we can't parse as JSON, it might be a streaming error or network error
          throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
        }
      }

      // Handle streaming response with function calling support
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';
      let buffer = '';
      let functionCallName = '';
      let functionCallArguments = '';
      let isFunctionCall = false;
      let conversationMessages = [...messages.map(msg => ({ role: msg.role, content: msg.content })), userMessage];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in buffer
        buffer = lines.pop() || '';

        // Process complete lines
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          if (trimmedLine.startsWith('data: ')) {
            const data = trimmedLine.slice(6);
            if (data === '[DONE]') {
              break;
            }

            try {
              const json = JSON.parse(data);
              const choice = json.choices[0];
              
              // Check for function call in delta
              if (choice?.delta?.tool_calls) {
                isFunctionCall = true;
                choice.delta.tool_calls.forEach(toolCall => {
                  if (toolCall?.index === 0 || toolCall?.id) {
                    if (toolCall?.function?.name) {
                      functionCallName = toolCall.function.name;
                    }
                    if (toolCall?.function?.arguments) {
                      functionCallArguments += toolCall.function.arguments;
                    }
                  }
                });
              }
              
              // Also check for tool_calls in finish_reason
              if (choice?.finish_reason === 'tool_calls') {
                isFunctionCall = true;
              }
              
              // Check for content delta
              const delta = choice?.delta?.content || '';
              if (delta) {
                accumulatedContent += delta;
                // Update the assistant message in real-time
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: accumulatedContent }
                    : msg
                ));
                // Auto-scroll as content streams in
                scrollToBottom();
              }
            } catch (e) {
              // Skip invalid JSON - this is normal for incomplete chunks
              console.debug('Skipping invalid JSON chunk:', e);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        const trimmedLine = buffer.trim();
        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6);
          if (data !== '[DONE]') {
            try {
              const json = JSON.parse(data);
              const delta = json.choices[0]?.delta?.content || '';
              if (delta) {
                accumulatedContent += delta;
              }
            } catch (e) {
              // Skip if invalid
            }
          }
        }
      }

      // If a function was called, execute it and continue the conversation
      if (isFunctionCall && functionCallName === 'web_search' && functionCallArguments) {
        try {
          // Parse function arguments
          let args;
          try {
            args = JSON.parse(functionCallArguments);
          } catch (parseError) {
            // If parsing fails, try to extract query from partial arguments
            const queryMatch = functionCallArguments.match(/"query"\s*:\s*"([^"]*)"/);
            if (queryMatch) {
              args = { query: queryMatch[1] };
            } else {
              throw new Error('Could not parse function arguments');
            }
          }
          
          const searchQuery = args.query;
          if (!searchQuery) {
            throw new Error('No search query provided');
          }
          
          // Show that we're searching
          const searchMessage = accumulatedContent + (accumulatedContent ? '\n\n' : '') + `🔍 Searching the web for: "${searchQuery}"...`;
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: searchMessage }
              : msg
          ));
          scrollToBottom();
          
          // Perform web search
          const searchResults = await performWebSearch(searchQuery);
          
          // Generate a unique tool call ID
          const toolCallId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          // Add function call and result to conversation
          conversationMessages.push({
            role: 'assistant',
            content: accumulatedContent || null,
            tool_calls: [{
              id: toolCallId,
              type: 'function',
              function: {
                name: 'web_search',
                arguments: functionCallArguments
              }
            }]
          });
          
          conversationMessages.push({
            role: 'tool',
            tool_call_id: toolCallId,
            name: 'web_search',
            content: searchResults
          });
          
          // Update message to show search completed
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: searchMessage + '\n\n✅ Search completed. Processing results...' }
              : msg
          ));
          scrollToBottom();
          
          // Continue conversation with search results
          const continueRequestBody = {
            model: model,
            messages: conversationMessages,
            stream: true
          };
          
          if (includeTemperature) {
            continueRequestBody.temperature = 0.7;
          }
          
          // Reset accumulated content and get final response
          accumulatedContent = '';
          const continueResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(continueRequestBody)
          });
          
          if (!continueResponse.ok) {
            const errorData = await continueResponse.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Failed to get response after web search');
          }
          
          // Process the continued response
          const continueReader = continueResponse.body.getReader();
          const continueDecoder = new TextDecoder();
          let continueBuffer = '';
          
          while (true) {
            const { done, value } = await continueReader.read();
            if (done) break;
            
            continueBuffer += continueDecoder.decode(value, { stream: true });
            const lines = continueBuffer.split('\n');
            continueBuffer = lines.pop() || '';
            
            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;
              
              const data = trimmedLine.slice(6);
              if (data === '[DONE]') break;
              
              try {
                const json = JSON.parse(data);
                const delta = json.choices[0]?.delta?.content || '';
                if (delta) {
                  accumulatedContent += delta;
                  // Update message with search info + new content
                  const finalContent = `🔍 Searched: "${searchQuery}"\n\n${accumulatedContent}`;
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessageId 
                      ? { ...msg, content: finalContent }
                      : msg
                  ));
                  scrollToBottom();
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
          
          // Final update with search context
          if (accumulatedContent) {
            const finalContent = `🔍 Searched: "${searchQuery}"\n\n${accumulatedContent}`;
            setMessages(prev => prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: finalContent }
                : msg
            ));
          }
        } catch (error) {
          console.error('Error executing web search:', error);
          const errorMessage = `Error performing web search: ${error.message}. Continuing with available information...`;
          accumulatedContent = (accumulatedContent || '') + (accumulatedContent ? '\n\n' : '') + errorMessage;
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: accumulatedContent }
              : msg
          ));
        }
      }

      // Final update to ensure all content is saved (only if no function call was made)
      if (!isFunctionCall || !functionCallName) {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: accumulatedContent || '' }
            : msg
        ));
      }
    } catch (err) {
      setError(err.message);
      // Remove the empty assistant message and add error message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}`
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
      scrollToBottom();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="heyjack-container">
        <div className="heyjack-header">
          <Button buttonStyle='btn--outline' buttonSize='btn--medium' to='/'>
            Back
          </Button>
          <h1 className="heyjack-title">Hey Jack</h1>
          <div style={{ width: '120px' }}></div>
        </div>
        <div className="heyjack-password-form">
          <div className="heyjack-password-box">
            <h2>Enter Password</h2>
            <p>This page is password protected.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                ref={passwordInputRef}
                type="password"
                className="heyjack-password-input"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter password"
                autoFocus
              />
              {passwordError && (
                <div className="heyjack-password-error">{passwordError}</div>
              )}
              <button type="submit" className="heyjack-password-button">
                Access Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="heyjack-container">
      <div className="heyjack-header">
        <Button buttonStyle='btn--outline' buttonSize='btn--medium' to='/'>
          Back
        </Button>
        <h1 className="heyjack-title">Hey Jack</h1>
        <Button 
          buttonStyle='btn--outline' 
          buttonSize='btn--medium' 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {error && (
        <div className="heyjack-error">
          <p><strong>Error:</strong> {error}</p>
          <small>
            {error.includes('not found') && (
              <>
                <strong>Quick fix:</strong> After creating/updating your .env file, you must restart your development server (stop with Ctrl+C, then run `npm start` again).<br />
                Make sure your .env file is in the root directory and contains: REACT_APP_OPENAI_API_KEY=your_key_here
              </>
            )}
          </small>
        </div>
      )}

      <div className="heyjack-chat">
        <div className="heyjack-messages">
          {messages.length === 0 && !isLoading && (
            <div className="heyjack-empty-state">
              <p>Start a conversation with ChatGPT</p>
              <small>Type a message below to begin chatting</small>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`heyjack-message ${message.role === 'user' ? 'heyjack-message-user' : 'heyjack-message-assistant'}`}
            >
              <div className="heyjack-message-content">
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({children}) => <p className="heyjack-markdown-p">{children}</p>,
                      ul: ({children}) => <ul className="heyjack-markdown-ul">{children}</ul>,
                      ol: ({children}) => <ol className="heyjack-markdown-ol">{children}</ol>,
                      li: ({children}) => <li className="heyjack-markdown-li">{children}</li>,
                      h1: ({children}) => <h1 className="heyjack-markdown-h1">{children}</h1>,
                      h2: ({children}) => <h2 className="heyjack-markdown-h2">{children}</h2>,
                      h3: ({children}) => <h3 className="heyjack-markdown-h3">{children}</h3>,
                      strong: ({children}) => <strong className="heyjack-markdown-strong">{children}</strong>,
                      a: ({href, children}) => (
                        <a className="heyjack-markdown-a" href={href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                      code: ({className, children}) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="heyjack-markdown-code-inline">{children}</code>
                        ) : (
                          <code className="heyjack-markdown-code-block">{children}</code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && messages.filter(m => m.role === 'assistant' && (!m.content || m.content === '')).length === 0 && (
            <div className="heyjack-message heyjack-message-assistant">
              <div className="heyjack-message-content">
                <div className="heyjack-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="heyjack-input-form" onSubmit={handleSend}>
          <input
            ref={inputRef}
            type="text"
            className="heyjack-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="heyjack-send-button"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeyJack;

