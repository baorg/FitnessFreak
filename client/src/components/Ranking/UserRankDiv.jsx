import { useRef } from 'react';
import styled from 'styled-components';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { responsive } from '../utils/data.json';

const BaseUserRankDiv = styled.div`
    text-align: left;
    margin-top: 15px;

    margin: 15px 20px 0 20px;
    display: flex;
    align-items: center;
    background-color: ${({self})=>self?"#065BFB":"white"};
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.06);
    min-height: 80px;

    &.my-rank{
        position: sticky;
        bottom: 0em;
    }

    .user-rank{
        width: 100px;
        height: 50px;
        font-size: 1.2em;
        text-align: center;
        justify-content: center;
        display: grid;
        place-content: center;

        font-style: normal;
        font-weight: 600;
        font-size: 23px;
        line-height: 27px;
        color: #065BFB;
        text-shadow: 0px 5px 4px rgba(0, 0, 0, 0.06);

        color: ${({self})=>self?"white":"#065BFB"};
        .rank-medal-img{
            height: 40px;
            width: 40px;
            align-self: center;
        }
    }


    .name-div{
        display: flex;
        flex-direction: column;
        padding: 10px;
        .name{
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: ${({self})=>self?"white":"black"}; 
        }

        .username{
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 19px;
            color: ${({self})=>self?"white":"#065BFB"}; 
        }
    }

    .followers-div{
        height: 100%;
        margin-left: auto;
    }

    .score-div{
        height: 44px;
        margin-left: auto;
        margin-right: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .main-score{
            font-style: normal;
            font-weight: 600;
            font-size: 23px;
            line-height: 27px;
            color: ${({self})=>self?"white":"#065BFB"};
        }

        .total-score{
            color: ${({self})=>self?"rgba(255, 255, 255, 0.6)":"rgba(66, 66, 89, 0.6)"};
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
        }
    }

    .categories-chip-container{
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px 0 10px;

        .categories-chip{
            margin: 4px;
        }
    }
`;

const LargeScreenDiv = styled(BaseUserRankDiv)``;
const MediumScreenDiv = styled(BaseUserRankDiv)``;
const MobileScreenDiv = styled(BaseUserRankDiv)`
    border-radius: 12px;
    margin: 15px 10px 0 10px;
    &.my-rank{
        position: sticky;
        bottom: 20px;
    }
    
`;

export default function UserRankDiv(props){
    let small = useMediaQuery(`(max-width: ${responsive.small})`);
    let medium = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
    const ref = useRef(null);


    if(props.self)
        console.log('Props ref :', props);

    switch(true){
        case small:
            return <MobileScreenDiv
                        {...props} 
                        ref={ref}
                        onClick={handleClick}
                    />
        
        case medium:
            return <MediumScreenDiv 
                        {...props}
                        ref={ref}
                        onClick={handleClick}
                    />
        
        default:
            return <LargeScreenDiv 
                        {...props}
                        ref={ref}
                        onClick={handleClick}
                    />
    }

    function handleClick(){
        if(props.self)
            takeDown();
    }

    function takeDown(){
        if(ref){
            ref.current.style.position = 'static';
            ref.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            // console.log('Taking down: ', selfRef.current.scrollIntoView);
            ref.current.style.position = 'sticky';
        }
    }
}

// export default UserRankDiv;