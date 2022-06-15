import styled from "styled-components";
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const BoxHome = ({ children, startColor, endColor, alignItems, justifyContent }) => {
    return (
        <LinearGradient
            colors={[startColor, endColor]}
            style={{ flex: 1, alignItems: alignItems, justifyContent: justifyContent }}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 0., y: 0.3 }}
        >
            {children}
        </LinearGradient>
    );
};

export const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

export const LButtonMaster = styled.TouchableOpacity`
background-color: ${props => props.bgcolor};
width: 80%;
height: 100px;
align-items: center;
justify-content: center;
elevation: 6;
border-radius: 5px;
border-width: 2px;
border-color: #FFF;
margin-bottom: 20px;
`;