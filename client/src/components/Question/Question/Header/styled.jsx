import styled from 'styled-components';
import { responsive } from 'src/components/utils/data.json';


// Styled components ===================================
let QuestionHeader = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;

    .avatar{
        width: 56px;
        height: 56px;

        @media(max-width: ${responsive.small}){
            width: 30px;
            height: 30px;
        }
    }

    .icon-div{
        margin-left: auto;
        display: flex;
    }

    .icon{
        margin-right: 20px;
        align-self: center;
        font-size: 35px;
        cursor: pointer;
    }
`;

let PostedName = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction:column;
`;

let NameDiv = styled.div`
    .posted-by{
        font-size: 0.9rem;
        color: #555;
    }
    
    .posted-by-name{
        text-decoration: none;
        font-size: 1.2em;
    }

    .deleted-name{
        color: #333;
    }
`;

let PostedDate = styled.div`
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    .posted-on{
        font-size: 14px;
        line-height: 17px;
        color: rgba(66, 66, 89, 0.8);
        
        @media(max-width: ${responsive.small}){
            font-size: 10px;
        }
    }
    .posted-date{
        margin-left: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #424259;

        @media(max-width: ${responsive.small}){
            font-size: 12px;
        }
    }
    
`;
//  =====================================================


export {
    PostedDate, NameDiv,
    PostedName, QuestionHeader
};