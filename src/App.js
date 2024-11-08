import logo from './logo.svg';
import './App.css';
import Search from 'antd/es/input/Search';
import { Image, List } from 'antd';
import { useEffect, useState } from 'react';
import { data } from './data';
function App() {

  const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(0);

    const handleSearch = value => {
        clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            const results = data.filter(item =>
                item.custom_value.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredResults(results);
        }, 1500); // 1500ms debounce time

        setTypingTimeout(timeout);
        setSearchTerm(value);
    };

    useEffect(() => {
        if (searchTerm === '') {
            const timeout = setTimeout(() => {
                const results = data.filter(item =>
                    item.custom_value.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredResults(results);
            }, 300); // 1500ms debounce time

            return () => clearTimeout(timeout); // Cleanup debounce on unmount or when searchTerm changes
        }
    }, [searchTerm, data]);
    console.log('searchTerm', searchTerm)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
            <Search style={{margin:"30px 0 50px 0", width: "75%"}} placeholder="Nhìn phân loại mà tìm..." onSearch={handleSearch} enterButton />
            <List
            
                dataSource={filteredResults}
                renderItem={item => <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                   <Image
                      style={{width: '80%'}}
                      src={`https://down-vn.img.susercontent.com/file/`+item.image_id}
                    />
                  <List.Item style={{color: 'white'}} key={item.id}>{item.custom_value}</List.Item>
                </div>}
            />
        </div>
      </header>
    </div>
  );
}

export default App;
