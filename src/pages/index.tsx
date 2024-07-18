import AutoComplete from '@/components/AutoComplete/AutoComplete';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import '../styles/index.css';

function HomePage() {
  return (
    <ErrorBoundary>
      <section>
        <div className='center-screen'>
          <h2 className='search-header'>Find your closest countries</h2>
          <AutoComplete />
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default HomePage;
