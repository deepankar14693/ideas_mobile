import React from 'react';
import { Input } from 'react-native-elements';

export default function AmountEditor(props) {
    const [value, onChangeText] = React.useState(props.value);
    const [isDirty, onChangeIsDirty] = React.useState(false);
    const [dirtyEntityId, onChangeDirtyEntityId] = React.useState(null);
    const [isFocused, toggleFocus] = React.useState(false);

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: props.value,
    //         isDirty: false,
    //         dirtyEntityId: null,
    //     };
    //     this.onBlur = this.onBlur.bind(this);
    //     this.onFocus = this.onFocus.bind(this);
    // }

    // componentDidMount() {
    //     document.addEventListener('onBlur', this.onBlur, false);
    //     document.addEventListener('onFocus', this.onFocus, false);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('onBlur', this.onBlur, false);
    //     document.removeEventListener('onFocus', this.onFocus, false);
    // }

    // onFocus() {
    //     if (document.getElementById(props.id).parentElement) {
    //         var element = document.getElementById(props.id).parentElement;
    //         element.className = element.className + " v-rt-input v-rt-textarea-div";
    //     }
    // }

    const onBlur = () => {
        if (isDirty) {
            // if (value) {
            //     if (value.length == 1) {
            //         if (value == "-") {
            //             value = value.replace("-", "");
            //         }
            //     }
            // }
            // if (props.row) {
            //     props.onUpdate(props.entityId, props.fieldName, value, props.row);
            // } else {
            //     props.onUpdate(props.entityId, props.fieldName, value);
            // }
            onChangeIsDirty(false);
            onChangeDirtyEntityId(null);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.state.dirtyEntityId === null && this.state.dirtyEntityId !== nextProps.entityId && props.value !== nextProps.value) {
    //         this.setState({ value: nextProps.value });
    //     }
    // }

    const renderNumberInput = () => {
        const allowNegative = props.allowNegative ? props.allowNegative : false;
        const maxLength = props.maxLength ? props.maxLength : 7;
        const inputBox = React.createRef();
        const textStyle = {
            height: props.height ? props.height : 32,
            alignItems: 'center',
            borderRadius: props.borderRadius ? props.borderRadius : 4,
            borderWidth: 1,
            borderColor: props.borderColor ? props.borderColor : '#b0bcd0',
        };
        return (
            <Input
                ref={inputBox}
                inputStyle={{ color: (isFocused ? "#233238" : "#566f99"), fontSize: 14, textAlign: 'right', fontStyle: (!value || value.length === 0) ? 'italic' : 'normal', }}
                maxLength={maxLength}
                placeholder={props.placeholder ? props.placeholder : ''}
                placeholderTextColor="#8396b4"
                keyboardType={'numeric'}
                returnKeyType={'$'}
                inputContainerStyle={textStyle}
                onChangeText={(value) => {
                    onChangeText(value);
                    onChangeIsDirty(true);
                    onChangeDirtyEntityId(props.entityId);
                }}
                value={value ? value.toString() : ''}
                onFocus={() => toggleFocus(true)}
                onBlur={() => toggleFocus(false)}
                returnKeyType={"done"}
            />
        );


        // if (props.allowDecimal && props.decimalPrecision) {
        //     return <NumberFormat
        //         //id={props.id}
        //         style={{ textAlign: 'right' }}
        //         value={value} 
        //         //allowNegative={false} maxLength={maxLength}
        //         //className={props.className} decimalScale={props.decimalPrecision}
        //         //onFocus={this.onFocus}
        //         onChangeText={(value) => {
        //             onChangeText(value);
        //             onChangeIsDirty(true);
        //             onChangeDirtyEntityId(props.entityId);
        //         }
        //         }
        //     //onBlur={this.onBlur} 
        //     />
        // }
        // else if (props.allowDecimal) {
        //     return <NumberFormat
        //         id={props.id}
        //         style={{ textAlign: 'right' }}
        //         value={value} allowNegative={false} maxLength={maxLength}
        //         className={props.className}
        //         onFocus={this.onFocus}
        //         onValueChange={(value) => {
        //             var estimate = 0;
        //             estimate = value.value;
        //             this.setState({ value: estimate, isDirty: true, dirtyEntityId: props.entityId })
        //         }}

        //         onBlur={this.onBlur} />
        // } else {
        //     var allowZero = props.allowZero;
        //     return <NumberFormat
        //         id={props.id}
        //         style={{ textAlign: 'right' }} thousandSeparator={','}
        //         value={formatAmount(value, false, allowZero)}
        //         allowNegative={allowNegative} decimalScale={0} maxLength={9}
        //         className={props.className}
        //         onFocus={this.onFocus}
        //         onValueChange={(value) => {
        //             var estimate = (allowZero ? null : 0);
        //             if (allowZero && !isEmpty2(value.value)) {
        //                 estimate = value.value;
        //             } else {
        //                 estimate = isEmpty2(value.value) ? null : value.value;
        //             }
        //             this.setState({ value: estimate, isDirty: true, dirtyEntityId: props.entityId })
        //         }}

        //         onBlur={this.onBlur} />
        // }
    }

    return (
        renderNumberInput()
    );
}
