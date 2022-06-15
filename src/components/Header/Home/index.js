import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BoxAtualiza, BoxTextAtualiza, InfoHeader, InfoLogged, TitleAtualiza, TopBarHome } from './style';

export default function HeaderHome({ dtatu, startColor, endColor, bgStatus, title, subTitle, textColor, barStyle }) {
    return (

        <TopBarHome
            startColor={startColor}
            endColor={endColor}
            textColor={textColor}
            alignItems="center"
            justifyContent="center"
        >
            <StatusBar barStyle={barStyle} backgroundColor={bgStatus} />

            <InfoLogged>
                <InfoLogged.Left>
                    <Icon name="ios-person-circle" size={20} color={textColor} />
                </InfoLogged.Left>

                <InfoLogged.Middle>
                    <InfoLogged.Title color={textColor}>
                        Anderson Brasil
                    </InfoLogged.Title>
                </InfoLogged.Middle>

                <InfoLogged.Right>
                    <Icon name="ios-exit-outline" size={20} color={textColor} />
                </InfoLogged.Right>
            </InfoLogged>

            <InfoHeader>
                <InfoHeader.Title color={textColor}>
                    {title}
                </InfoHeader.Title>
                <InfoHeader.SubTitle color={textColor}>
                    {subTitle}
                </InfoHeader.SubTitle>
            </InfoHeader>

            <BoxAtualiza bgcolor="#FFF">
                <BoxTextAtualiza>
                    <TitleAtualiza color="#555">
                        {dtatu}
                    </TitleAtualiza>
                </BoxTextAtualiza>
                {/* <Calendar colorCalendar={colorCalendar} /> */}
            </BoxAtualiza>

        </TopBarHome>
    );
}