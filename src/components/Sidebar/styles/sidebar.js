import styled from 'styled-components/macro'


export const Menu = styled.div`

    position:fixed; z-index:9999; height:100vh; 
    /* background: #22818e38; */
    background: #000;

    width:100%;
    height: 100%;
    top: 0;
    left: 0;
    left: ${({toggle})=>(toggle? '0': "-100%")};
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: .3s ease all;
    transition: .3s ease all;
    display:none;

    @media (max-width: 768px){
      display:flex;
      flex-direction: column;
    }
   

`

export const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
    height: 100vh;
    background: #fff;
    width: 60%;

`

export const List = styled.div`
display:flex;
flex-direction: column;
padding-top:2rem;
.btn-group{
display: flex;
gap: 15px;
align-items: center;
}


`

export const ListRoute = styled.div`
display: flex;
align-items: center;
gap: 20px;
font-size: .9rem;
color: #43425D;
padding: 1rem 0;
border-bottom: 1px solid #a09f9f26;

.inner-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    border: 1px solid #00509d;
    height: 35px;
    border-radius: .3rem;
    border: 1px solid #00509d;
    
    background: #ffffff;
    color: #00509d;
  
}
.inner-btn2{
 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    border: 1px solid #00509d;
    height: 35px;
    background: #00509d;
    color: #fff;
    border-radius: .3rem;
    padding: 0 .3rem;

  
}

`