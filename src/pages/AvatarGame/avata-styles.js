import styled from "styled-components/macro";

export const Container = styled.div`
display:flex;
@media (max-width:1000px){
   flex-direction: column;
}

`

export const Column = styled.div`
width: ${({width})=> width? width : '100%'};

.no-data-notify{
    color:var(--humber-light-2);
    width: 100%;
    text-align: center;
    height: 100px;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
}
.avatar-sidebar{
    display:block;
    @media (max-width:1000px){
        display: none;
    }
}
.show-avatar-modal{
    display:none;
    justify-content:center;
    align-items:center;
    button{
        border: none;
    border-radius: 30px!important;
    outline: none;
    cursor: pointer;
    color: var(--humber-black);
    width: 250px;
    height: 40px;
    font-size: 1rem;
    border-radius: 5px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: var(--humber-button-color);
    margin: auto;
    }
    @media (max-width:1000px){
    display: flex;
}
}
@media (max-width:1000px){
    width:100% ;
}
@media (max-width:640px){
    width:100% ;
   

}

`

export const Title = styled.div`
text-align: ${({align})=>align ? align : 'left'};
font-size:1.5rem;
color: ${({color})=>color ?color : 'var(--humber-light)'};

`

export const Gap = styled.div`
padding: ${({padding})=> padding ? padding :'.7rem'};
`

export const AvatarLogo = styled.div`
width:100px;
.page-header{
    display: flex;
    align-items: center;
    gap: .5rem;
    color:#d3d3d3;
}
`

export const Card = styled.div`
display:flex;
flex-wrap:wrap;
`
export const CardItem = styled.div`
flex:0 0 30%;
padding: .5rem;
margin:.0rem .7rem .7rem 0;
border: 1px solid #2c2c2b;
height:300px;
border-radius:10px;
background:var(--humber-dark);
animation: zoom-in-zoom-out 1s ease ;

@keyframes zoom-in-zoom-out {
0% {
    transform: scale(1, 1);
}
50% {
    transform: scale(1);
}
100% {
    transform: scale(1, 1);
}
}
@media (max-width:1280px){
    flex:0 0 47%; 
    padding: 1rem;
}

@media (max-width:640px){
    flex:0 0 47%; 
}
@media (max-width:480px){
    flex:0 0 100%; 
 
}
`
export const AvatarProfile = styled.div`
display:flex;
align-items: center;
justify-content: ${({justifyContent})=> justifyContent};
position: relative;
flex-direction: ${({direction})=>direction};
color: var(--humber-light);
.avatar-select-box{
    position: relative;
    svg{
    position: absolute;
    top: 0;
    right: -10px;
    color: #ffffff;
    stroke-width: 3;
    background: #000;
    border-radius: 50%;
    padding: 2px;
    }
}
.avatar-pic{
    height: 50px;
    width: 50px;
    background: #212529;
    border-radius: 50%;
    margin-right: ${({mR})=>mR ? mR : '10px'};
    border: 1px solid var(--humber-primary);
    overflow: hidden;
    img{
        width:100%;
        height: 100%;
        object-fit: contain;
    }
}
.avatar-box{
    color: var(--humber-primary);
    font-weight: 800;
    .avatar-name{ 
    line-height: 1;
    white-space: nowrap;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    }
    .avatar-name{
    }
}
.delete-avatar{
    position: absolute;
    right:0;
    top:0;
    svg{
        color:var(--humber-primary);
        cursor: pointer;
    }
}

`


export const AvatarDetails = styled.div`
 
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
`
export const List = styled.div`
color: #544747;
strong{
    ${'' /* color:var(--humber-light);   */}
}
`

export const AvatarSideBar = styled.div`
.view-selected-avatar{
    color: rgb(255 206 151);
    text-align: center;
    cursor: pointer;
}

`
export const AvatarListItems = styled.div`
flex:0 0 25%;
margin-bottom:.5rem;
cursor: pointer;
`
export const AvatarList = styled.div`
    width: 65%;
    height: 100vh;
    background: var(--gradient-secondary);
    border-radius: 10px;
    padding: 1rem;
    @media (max-width:1000px){
        width: 100%;
        display: none;
    }
   
`
export const AvatarListModal= styled.div`
    max-width: 350px;
    min-height: 50vh;
    background: var(--gradient-secondary);
    border-radius: 10px;
    padding: 1rem;
    display:none;
    @media (max-width:1000px){
        display:block
    }
    @media (max-width:640px){
        width: 100%;
    }
   
`

export const IntroCard = styled.div`
     display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 0 0 28%;
    padding: 2rem;
    ${'' /* border: 1px solid  var(--humber-primary); */}
    height: 300px;
    border-radius: 10px;
    background: var(--humber-dark);
    margin: auto;
    box-shadow:0px 0px 10px rgb(0 0 0 / 15%);

    animation: zoom-in-zoom-out 1s ease ;

    @keyframes zoom-in-zoom-out {
    0% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1, 1);
    }
    }


`

export const Button = styled.button`
    border: none;
    border-radius: 30px!important;
    outline: none;
    cursor: pointer;
    color: var(--humber-light);
    /* margin-top: 20px; */
    width: 150px;
    height: 40px;
    font-size: 1rem;
    border-radius: 5px;
    transition: all .3s ease-in-out;
    background: var(--humber-button-color);
    margin: ${({margin})=>margin ? margin : '10px auto'};

`

export const AvatarHeader= styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-right: 5rem;
    flex-wrap: wrap;
    .avatar-summary{
      ${'' /* color: var(--humber-light); */}
      font-size:1.1rem;
      span{
          color: var(--humber-primary);
      }
      @media (max-width:640px){
          font-size: 0.9rem;
      }
    }

@media (max-width:640px){
    padding-right: 0;
    button{
        border: none;
    border-radius: 30
px
!important;
    outline: none;
    cursor: pointer;
    color: var(--humber-black);
    width: 110px;
    height: 35px;
    font-size: .8rem;
    border-radius: 5px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: var(--humber-button-color);
    margin: 0;
    }
}
`

export const Loading = styled.div`
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
`

export const AvatarXs = styled.div`
 display: none;

 @media (max-width:1000px){
     display:block;
 }
`