import useMediaQuery from '@material-ui/core/useMediaQuery';

import styled from 'styled-components';
import Suggestion from './suggestions';
import { responsive } from '../../utils/data.json';

// Styled Components ===============================================================================================

const RightNavBar = styled.div`
    grid-column: 3 / 4;
    /* grid-area: right-nav; */

    position: sticky;
    top: 50px;
    left: 10em;
    padding-top: 50px;

    
    height: fit-content;
    display: flex;
    flex-direction: column;
`;

// ==================================================================================================================


export default function RightNav({ }) {
    let showRightNav = useMediaQuery(`(min-width:${responsive.medium})`);

    return (showRightNav &&
        <RightNavBar>
            <Suggestion />
        </RightNavBar>
    );
}