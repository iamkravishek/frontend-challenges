const TAB_LIST = [
  {
    id: 1,
    tabName : "Test 1",
    tabContent : "Test 1 Content"
  },
  {
    id: 2,
    tabName : "Test 2",
    tabContent : "Test 2 Content"
  },
  {
    id: 3,
    tabName : "Test 3",
    tabContent : "Test 3 Content"
  },
];

import { useState } from 'react';
import TabList from './TabList'
import TabPanel from './TabPanel'
import './Tabs.css'

export default function Tabs(){
    const [activeIndex, setActiveIndex] = useState<number>(1);

    const handletabs = (id : number) => {
        setActiveIndex(id);
    }

    
    return (
        <section className="tabs">
            <div className='tab-items'>
                <TabList tabs={TAB_LIST} activeTab={handletabs}/>
            </div>
            <div className='tab-panel'>
                <TabPanel tabs={TAB_LIST} isActive={activeIndex}/>
            </div>
        </section>
    )
}