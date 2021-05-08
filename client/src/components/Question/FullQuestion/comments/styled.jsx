import styled from 'styled-components';
import { responsive } from 'src/components/utils/data.json';

const CommentsContainer = styled.div`
    background: #F2F4F5;
    border-radius: 8px;
    max-height: 250px;
    overflow-y: auto;

    scrollbar-color: #E3E3E3 transparent;
    scrollbar-width: 10px;
    
    
    ::-webkit-scrollbar-thumb {
        background: #E3E3E3;
        border-radius: 10px;
        outline: 1px solid rgb(210, 230, 250);
    }
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: 1em;
    }

`;


const CommentDiv = styled.div`
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .dlt-icon{
        cursor: pointer;
        margin-left: auto;
        outline-style: none;
    }

    .header{
        display: flex;
        align-items: center;
        margin-left: 10px;
        
        .avatar{
            width: 35px;
            height: 35px;
            cursor: pointer;
        }
        
        
        .posted-data{
            margin-left: 10px;
            display: flex;
            flex-direction:column;

            .posted-name{
                .posted-by{
                    font-size: 0.9rem;
                    color: #555;
                }
                .posted-by-name{
                    font-size: 1.1em;
                    text-decoration: none;
                }
            
                .deleted-name{
                    color: #333;
                }
            }
        
            .posted-date{
                .heading{
                    font-size: 14px;
                    line-height: 17px;
                    color: rgba(66, 66, 89, 0.8);
                
                    @media(max-width: ${responsive.small}){
                        font-size: 10px;
                    }
                }
                .content{
                    margin-left: 4px;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 20px;
                    color: #424259;
                
                    @media(max-width: ${responsive.small}){
                        font-size: 12px;
                    }
                }
            }
        }
    }

    .comment{
        margin: 20px 0 10px 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 163.3%;
        color: #424259;
    }

`;


const VoteDiv = styled.div`
    display: flex;
    align-items: center;
    justify-items: space-evenly;
    margin: 10px 0 0 40px;
    .vote-btn{
        cursor: pointer;
    }
`;

const VoteCountDiv = styled.div`
    color: ${({ count }) => count < 0 ? "#ff8080" : "#065BFB"};
    text-align: center;
    height: 1.4em;
    border-radius: 10px;
    margin: 0 15px 0 15px;
    
    font-family: SF Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 27px;


`;
export { CommentsContainer, CommentDiv, VoteDiv, VoteCountDiv };