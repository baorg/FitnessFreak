import styled from 'styled-components';

const UserRankDiv = styled.div`
    
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
            font-size: 20px;
            color: ${({self})=>self?"white":"black"}; 
        }

        .username{
            color: ${({self})=>self?"white":"blue"}; 
        }
    }

    .followers-div{
        height: 100%;
        margin-left: auto;
    }

    .score-div{
        height: 100%;
        margin-left: auto;
        margin-right: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .main-score{
            font-size: 1.2em;
            color: ${({self})=>self?"white":"#065BFB"};
        }

        .total-score{
            color: ${({self})=>self?"rgba(255, 255, 255, 0.6)":"rgba(66, 66, 89, 0.6)"};
            font-size: 12px;
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

export default UserRankDiv;