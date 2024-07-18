import AutoComplete from '@/components/AutoComplete/AutoComplete';
import './index.css';

function HomePage() {
  return (
    <section>
      <div className='center-screen'>
        <h2 className='search-header'>Find your closest countries</h2>
        <AutoComplete />
      </div>
    </section>
  );
}

export default HomePage;
