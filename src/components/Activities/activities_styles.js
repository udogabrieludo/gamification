import styled  from "styled-components/macro";


export const Card = styled.div`

    position: relative;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: var(--humber-light);
    background-clip: border-box;
   
    -webkit-border-radius: .25rem;
    -moz-border-radius: .25rem;
    border-radius: .25rem;  
    width: 100%;
    ${'' /* border:1px solid var(--humber-primary); */}
    border-radius: .95rem;
    box-shadow: 0 0 14px #0000001c;
    

`

export const CardBody = styled.div`
    -webkit-flex: 1 1 auto;
    -moz-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1rem 1rem;
`

export const RowContent = styled.div`
    justify-content:${props=> props.justify ? props.justify : "space-between!important"};
    align-items: center;
    display: flex;
   

    .dashboard_action{
        font-size:12px
    }
   
` 

export const PositionWrapper = styled.div`
    ${'' /* margin-bottom: 35px;
    padding: 20px; */}
    box-shadow: 0px 0px 9px #0000001c;
    border-radius: 50%;
    width:100px;
    height:100px;
    /* background: linear-gradient(45deg, #a40606, #d98324); */
    background: var(--humber-light);
    display:flex;
    flex-direction: column;
    justify-content: center;
    cursor:pointer;
    .leaderboard-position{
      color:var(--humber-primary);  
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1;
    }

    @media (max-width:1043px){
        width:80px;
    height:80px; 
    }


`




// export const Row = styled.div`

//     -webkit-flex: 0 0 auto;
//     -moz-box-flex: 0;
//     -ms-flex: 0 0 auto;
//     flex: 0 0 auto;
//     width: 33.33333333%;

// `