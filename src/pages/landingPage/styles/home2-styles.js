import styled  from "styled-components/macro";

export const Container = styled.div`
background-image: url('/new_biggies.png');
min-height: 100vh;
background-repeat: no-repeat;
background-position: right;
background-size: 40%;
background-color: var(--humber-background);
background-attachment: fixed;
@media (max-width:640px){
  background-size: 100%;
}

`

export const Wrapper = styled.div`
width:100%; 

display: flex;
flex-direction: column;
/* background: #0100304d; */
/* background: #0504157; */

`

export const Row = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: ${({height})=>height};
gap: 30px;
flex-wrap:wrap;

&:nth-child(2){
    margin-top:-1rem;
    margin-bottom: 1rem;

    @media (max-width:1024px){
        margin-top: 1.3rem;
       margin-bottom: 1rem;
      

    }
    @media (max-width:1000px){
        margin-top: 1.3rem;
       margin-bottom: 1rem;
       height: auto;

    }
    @media (max-width:600px){
        
    }
}
&:nth-child(3){
    @media (max-width:1024px){     
    margin-top: 4rem;
    }

}

.half-circle{
  position: relative;
  width: 100%;
 width:800px;
  height: 150px;
  background-image: url(/semi-circle.svg);
  background-repeat: no-repeat;
  background-position: bottom center;
  z-index: 2;
  background-position-y: -10%;
 
  .desc-box{
      width: 300px;
    margin:auto;
    padding-top: 4rem;
    .desc{
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
    font-family: arial;
    color: #010030;
    line-height:1;

    }
  }

  .gift1{
    position: absolute;
    left: 24%;
    top: -14%;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
  }
  .gift2{
    position: absolute;
    bottom: 0%;
    right: 10%;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
  }
  .gift3{
    position: absolute;
    right: 28%;
    top: -50%;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
  }
  .gift4{
    position: absolute;
    bottom: 0%;
    left: 6%;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
  }
  .gift5{
    position: absolute;
    top: -40%;
    left: 41%;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
  }
  @media (max-width:600px){
      img{
        width: 105px;
      }
      .desc-box{
          .desc{
            font-size: .9rem;

          }
      }
      .gift2 {
   
    bottom: 0%;
    right: 0%;
    }
    .gift3 {
    position: absolute;
    right: 0%;
    top: -15%;
   }
.gift1 {
    position: absolute;
    left: 5%;
    top: -5%;
}
  }
}
`

export const Column = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color:#fff;
padding: 0rem 0 0 0;

`

export const Subtitle = styled.div`
display: block;
color: rgb(0, 0, 0);
font-size: 1rem;
padding: .7rem ;
text-align:center;
line-height: 1;

  strong{
      color: #F46800;
  }
  span{
   ${'' /* color: var(--humber-light) */}
  }

`

export const Card = styled.div`
position: relative;
width: 250px;
height:250px;
background-color: var(--humber-light);
border-radius: .5rem;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border:1px solid var(--humber-primary);
/* transition: width 2s, height 4s; */
transition: width .5s, height 1s;
cursor: pointer;


&:nth-child(even){
    width: 350px;
    height: 350px;
}
button{
background: var(--humber-button-color);
border-radius: 30px;
outline: none;
border: none;
height: 40px ;
padding: 1rem;
color:var(--humber-light);

justify-content: center;
align-items: center;
width: 130px;
display: none;
margin-bottom:1.3rem;
&:hover{
    ${'' /* background: #fff; */}
    color:var(--humber-light);
    border:1px solid var(--humber-light);
}
}
p{
 max-width: 0;
  display: none;
  /* -webkit-transition: color .25s 1.5s, max-width 2s;
  transition: color .25s 1.5s, max-width 2s; */

  -webkit-transition: color .2s .5s, max-width .5s;
  transition: color .2s .5s, max-width .5s;
  vertical-align: top;
  white-space: wrap;
  overflow: hidden;
  ${'' /* color: var(--humber-light); */}
  word-wrap: break-word;
  text-align:center;
  font-size: 1rem;
  strong{
      color: var(--humber-button-color);
  }

}
&:hover{
width: 550px;
height:350px; 

> ${Subtitle}{
    display: none;
}

 p{
     display: block;
    max-width: 500px;
    word-wrap: break-word;
    padding-bottom:1rem;
 }

 button{
     display: flex;
 }

 
 @media (max-width:768px){
    width: 250px;
    height: 500px;
    padding: 1rem; 
    p{
     display: block;
    max-width: 250px;
    word-wrap: break-word;
    padding-bottom:1rem;
 }

}

 
}




`

export const CardAvatar = styled.div`
img{
width: ${({width})=>width ? width : '130px'};
height: ${({height})=>height ? height : '130px'};
padding:  ${({padding})=>padding};
margin:  ${({margin})=>margin};
}

`

export const Header = styled.div`
    font-size: 3.5rem;
    font-weight: 900;
    color: #fff;
    display: flex;
    gap: 20px;
    color: var(--humber-button-color);  
    font-family:Arial, Helvetica, sans-serif;
    padding-top: 1.5rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
    /* text-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .3) */
    span{
       color: #fff;
    }
   @media (max-width:600px){
    flex-wrap: wrap;
    font-size: 2.5rem;
    gap: 10px;
    line-height: 1;
    justify-content: center;
    margin: 1rem 0;
   }

`


export const Text = styled.div` 
font-size: ${({size})=>size ? size : '1.4rem'};
color: ${({color})=>color };
font-family: poppins;
@media (max-width:600px){

    font-size: 1rem;
    text-align: center;
    width: 300px;
    
    /* margin-bottom: 2rem; */
}

`