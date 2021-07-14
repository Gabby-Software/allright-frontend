import styled from "styled-components";

export const MobileStickyBottom = styled.div`
@media all and (max-width: ${p => p.theme.vars.media.tablet}px) {
    position: sticky;
    bottom: 0;
    padding-bottom: 20px;
    background: linear-gradient(to bottom, transparent 30px, white 15px);
    margin: 0 -1px -20px 0;
    z-index: 2;
}
`;
