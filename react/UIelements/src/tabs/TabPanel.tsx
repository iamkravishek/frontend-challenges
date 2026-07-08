import './TabList.css'
type tab = {id:number, tabName: string, tabContent: string};
type tablistProps = {
   tabs : tab[]
   isActive : number;
}
export default function TabPanel( {tabs, isActive} : tablistProps){
    return (
        <section className="panel-container">
            {
                tabs.map((item)=>{
                    return (
                        <p key={item.id} className={isActive === item.id ? 'active' : 'panel'}>
                            {item.tabContent}
                        </p>
                    )
                })
            }           
        </section>
    )
}