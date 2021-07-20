import styled from "styled-components";

export default styled.div`

.profile-addr {
    &__add {
        color: ${p => p.theme.vars.colors.primary};
        font-size: 10px;
        font-weight: 500;
        text-decoration: underline;
        cursor: pointer;
    }
}
`;
