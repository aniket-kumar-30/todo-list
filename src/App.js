import Header from './component/Header'
import Main from './component/Main'
import Footer from './component/Footer'
import { TodoProvider } from './context/todo';
function App() {
  return (
    <TodoProvider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodoProvider>
  );
}

export default App;
