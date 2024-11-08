import logo from './logo.svg';
import './App.css';
import Search from 'antd/es/input/Search';
import { Image, List } from 'antd';
import { useEffect, useState } from 'react';
import { data } from './data';
function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = value => {
      setSearchTerm(value);
  };
  useEffect(() => {
    handleSearch(searchTerm)
},[searchTerm]);
  const filteredResults = data?.filter(item =>
      item.custom_value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
            <Search style={{margin:"10px 0 50px 0"}} placeholder="Search custom value..." onSearch={handleSearch} enterButton />
            <List
                dataSource={filteredResults}
                renderItem={item => <div>
                   <Image
                      width={200}
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
