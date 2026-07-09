import { useEffect, useState } from 'react';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="backToTop" >
      <h1>Back To Top</h1>

      <div
        className="content-container"
      >
       {
          Array.from({ length: 15 }).map((_, index) => (
            <p key={index}>I am {index + 1} line</p>
         ))
       }
      </div>

      {
        isVisible && 
        <div className="container">
            <button
              className="backtotop-btn"
              onClick={scrollToTop}
              data-testid="back-to-top-btn"
            >
              Back to Top
            </button>

          </div>
      }
    </div>
  );
}
export default BackToTop;
