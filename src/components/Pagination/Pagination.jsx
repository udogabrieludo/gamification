import paginate from './paginate.module.css'

const Pagination = ({total, currentPage = '1', pageLimit}) => {
    const pageNumbers = total / pageLimit
    const pages = Math.ceil(pageNumbers)
   
    const numberArray = [...Array(pages).keys()];
    
    
    function goToNextPage() {
        // not yet implemented
     }
   
     function goToPreviousPage() {
        // not yet implemented
     }
   
     function changePage(event) {
        // not yet implemented
     }
   
     const getPaginatedData = () => {
        // not yet implemented
     };
   
     const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
      };
  return (
    <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {
        numberArray?.map((num, idx)=>{
            return (
                <li className="page-item"><a className="page-link" href="#">{num + 1}</a></li>
            )
        }) 
      }
      
      <li  className="page-item active"><a className="page-link" href="#">2</a></li>
      
    </ul>
  </nav>
  );
};



export default Pagination