import styled from 'styled-components/macro'

export const Modal = styled.div`
top:0px;
position: fixed;
width: ${({maxWidth})=>maxWidth ? maxWidth : '100%'};
height: 100vh;
background: #0000008a;
/* background: red; */
display: flex;
justify-content: center;
z-index: 999;
.token-notification{
  background: #76c2eb52;
  color: #044ea9;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: .5rem;

}




@media (max-width:1024px){
      width: ${({maxWidth})=>maxWidth? maxWidth: '100%'}; 
    }

@media (max-width:1000px){
  width:100%; 
}

 @media (max-width:768px){
     width: 100%;
     align-items: center;
 }

`

export const ModalBody = styled.div`
top: 68px;
  position:relative;
display: flex;
/* display: contents; */
/* justify-content: center; */
align-items: center;
flex-direction:column;
/* margin-top:2rem; */
height: 100vh;
/* width: 70%; */

@media (max-width:768px){
  overflow: scroll;
  min-height: 100%;
 
}

@media (max-width:600px){
  padding: 0;
    }

animation: zoom-in-zoom-out 1s ease ;

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}


@media (max-width:600px){

    /* margin-top: -7rem; */
}

`




export const ModalRow = styled.div`
display: flex;
gap: 30px;

min-width: 500px;
  @media (max-width:600px){
  flex-direction: column;
  min-width: 200px;
}


`

export const ModalContent = styled.div`
display:flex;
position: relative;

border-radius:10px;
.cancel{
    position: absolute;
    top: 0;
    right: 0;
    padding: 0rem;
    color: #fff;
    fill:var(--humber-secondary);
    width: 40px;
    height: 40px;
    cursor: pointer;

}
@media (max-width:600px){
      /* padding: 2rem; */
      max-height: 100%;
    overflow-y: auto;
    }
`

export const ModalItem = styled.div`
background: var(--humber-light);
border-radius: 10px;
box-shadow: 0 0 8px 8px rgb(0 0 0 / 9%);
padding: 2rem;
margin-top:1rem;
border: 1px solid var(--humber-primary);
width: ${({width})=>width};

.btn-group-box{
  display:flex;
  justify-content:center;
  margin-top:1rem;
.confirm-play{
    background: var(--humber-button-color);
    border-radius: 30px;
    outline: none;
    display: flex;
    border: none;
    height: 40px;
    padding: 1rem;
    color: var(--humber-black);
    justify-content: center;
    align-items: center;
    width: 130px;
    margin-right:10px;
}
.cancel-play{
    background: var(--gradient-tertiary);
    border-radius: 30px;
    outline: none;
    display: flex;
    border: none;
    height: 40px;
    padding: 1rem;
    color: var(--humber-black);
    justify-content: center;
    align-items: center;
    width: 130px;
}
}
.success-icon{
  background: #057e05;
    color: #fff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

@media (max-width:600px){
    padding: 2rem 1rem;
    width: 300px;
    height: 100%;
    max-height: 400px;
    overflow: scroll;
}



h3{
    font-size:1.1rem;
    display: none;
}
input{
    border: 2px solid rgb(18 56 115 / 47%);
    ${'' /* color: var(--humber-light)!important; */}
    border-radius: 10px;
    height: 50px !important;
    padding: 0 .5rem;
    margin-bottom: 0;
    background:none;
    &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    ${'' /* color: var(--humber-light); */}
    &:focus{
    outline: none;
    background:none!important
}
    
};


}
.inputGap{
    margin-bottom: 1rem; 
}
small{
  color:red;
   
}
.warning-notice{
  color:#747272;
}
button{
    border: none;
    border-radius:10px;
    height: 50px ;
    padding: 0 .5rem; 
    width: 100%;
    background: var(--humber-secondary);
    color: var(--humber-light); 
}

.forgot-password{
    text-align: end;
    padding-top: .5rem;
    color: #F46800;
    cursor:pointer;
}
.modal-tab{
    display: flex;
    gap: 30px;
    font-weight: 600;
    margin: 0 1rem;
    border-bottom: 1px solid #d3d3d3;
    margin-bottom: 1.5rem;


    .tab{
    
    width: 120px;
    display: flex;
    align-items: center;
    /* border-bottom: 4px solid #F46800; */
    font-size:1rem;
    text-transform: uppercase;
    padding-bottom:3px;
    ${'' /* color: var(--humber-light); */}
    cursor: pointer;
    &:last-of-type{
        border-bottom: 4px solid transparent;
    }
    }
}



`
export const ModalColumn = styled.div`
    padding: 2rem 0;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;
    flex: 1 1 300px;
    border: 2px solid #eaeaea;
    cursor: pointer;
  @media (max-width:600px){
    flex: 1 1 200px;
  }

`

export const ModalHeader = styled.div`
text-align: center;
font-size: 1.5rem;
font-weight: 600;
margin: 1rem;
color: #00509d;

@media(max-width:600px){
  font-size: 1.2rem;
}

`

export const ModalTitle = styled.div`
font-size: 1.2rem;
`