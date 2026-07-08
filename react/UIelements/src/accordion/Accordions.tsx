import { useState } from "react";
import AccordionItem from "./AccordionItem";

    const CONTENT : {q:string, a:string}[] = [
        {
            q: "test1",
            a: 'test1 content'
        },
        {
            q: "test2",
            a: 'test2 content'
        },
        {
            q: "test3",
            a: 'test3 content'
        },
        {
            q: "test4",
            a: 'test4 content'
        }
    ];

export default function Accordions(){
    const [openIndex, setOpenIndex] = useState<number | string | null>(null);

    // const currentIndex = useRef<number | string | null>(0)

    function toggleAccordion(idx: number | string |null) {
        setOpenIndex((prev) => {
            const next = prev === idx ? null : idx;
            return next;
        });
    }

    return(
        <section className="accordion-list">
          {
            CONTENT.map((item : {q:string, a:string}, idx : number| string)=>{
                 return (
                    <AccordionItem {...item} key={idx} toggle={()=>toggleAccordion(idx)} isOpen= {idx === openIndex}/>
                 )
            })
          }
        </section>
    )
}