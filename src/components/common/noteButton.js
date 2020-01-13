import React from 'react';
import Translation from '../../components/common/translation';
import ButtonWithIcon from '../../components/UI/CustomButtons/ButtonWithIcon';
import { buttonStyle } from '../../css/button';
import { translateKey } from '../../common/utils';

export default function NoteButton(props) {
    const renderButton = (buttonType, toggleClick, disabled) => {
        switch (buttonType) {
            case 1:
                return (
                    <ButtonWithIcon buttonStyle={{ ...buttonStyle.btnNeutralSolidStyle }}
                        onPress={toggleClick}
                        disabled={disabled}
                        textStyle={buttonStyle.textButtonStyle}
                        iconName="md-list-box" iconStyle={buttonStyle.iconStyle} >
                        {translateKey('Read')}
                    </ButtonWithIcon>
                )
            case 2:
                return <ButtonWithIcon buttonStyle={{ ...buttonStyle.btnNeutralOutlineStyle }}
                    onPress={toggleClick}
                    disabled={disabled}
                    textStyle={buttonStyle.textButtonStyle}
                    iconName="md-create" iconStyle={buttonStyle.iconStyle} >
                    {translateKey('Add')}
                </ButtonWithIcon>
            default: return "";
        }
    }

    return (
        renderButton(props.buttonType, props.toggleClick, props.disabled ? true : false)
    )

}


