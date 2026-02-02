 
import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
  
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {

    console.error("Erro 'capturado' (pode ser de uma extensão):", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600">Ops! Algo quebrou.</h1>
          <p className="mt-2 text-gray-600">
            Isso pode ser causado por uma extensão do navegador (como o React DevTools).
          </p>
          <pre className="text-left bg-gray-100 p-2 my-2 overflow-auto text-xs">
            {this.state.error?.message}
          </pre>
          <Link to="/home"
                onClick={() => this.setState({ hasError: false })} 
                className="mt-4 inline-block text-blue-600 hover:underline">
            Tentar voltar para a Home
          </Link>
        </div>
      );
    }

   
    return this.props.children;
  }
}

export default ErrorBoundary;