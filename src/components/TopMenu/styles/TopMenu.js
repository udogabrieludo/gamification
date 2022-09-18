import styled from 'styled-components/macro'


export const Container = styled.div`
width: 100%;
position: sticky;
top: 0;
display: flex;
align-items: center;
justify-content: center;
z-index: 999;
height: 80px;
/* background: var(--gradient-secondary); */
/* background:#112457; */
background:#fff;


`

export const Wrapper = styled.div`
width: 100%;
max-width: 1300px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 color: #fff;
 padding: 0 2rem;

`

export const Group = styled.div`
display: ${({showDesktop})=>showDesktop ? showDesktop : 'flex'};
align-items: center;
gap: 30px;
font-size: 1rem;

    @media (max-width:768px){
    display: ${({showMobile})=>showMobile ? showMobile : 'flex'};


}

`

export const Logo = styled.div`
 img{    
    width: 100px;
 }
 @media (max-width:600px){
    img{    
    width: 100px;
 }  
 }

`

export const LinkItem = styled.div`
 cursor: pointer;
 &:hover{
     color:#F46800;
 }
a{ 
color: #000;
font-weight:600;
}
 .user-avatar-box{
     display: flex;
     align-items: center;
     gap: 10px;
     .avatar{
         height: 35px;
         width: 35px;
         display: flex;
         align-items: center;
         justify-content: center;
         background: #010030;
    border-radius: 50%;
    font-size: 1rem;
    color: #fff;
    font-weight: 600;
     }
     .desc{
      font-size: 18px; 
      text-transform: capitalize;
      color: #010030;
      font-weight: 600;
     }
 }

`

export const Button = styled.button`
     background: var(--humber-button-color);
    ${'' /* border-radius: 30px; */}
    outline: none;
    /* border: 1px solid #fff; */
    height: 35px;
    width: 150px;
    border-radius:30px;
    border: 1px solid transparent;
    &:hover{
        color: #fff;
        border: 1px solid #fff;
        background-color: var(--humber-button-color);
    }

`