import React from 'react'
import "./styles/FormElements.scss"

// textarea components
export const TextArea = ({ placeholder, maxLength, value, onChange, name }) => {
    return (
        <div className='textArea'>
            <span className='maxLength'>{value?.toString().length}/{maxLength}文字</span>
            <textarea name={name} placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} />
        </div>
    )
}

// input components
export const Input = ({ lable, placeholder, maxLength, value, onChange, name }) => {
    return (
        <div className='input'>
            <div className='lableContainer'>
                <label htmlFor={name}>{lable}</label>
                <span className='maxLength'>{value?.toString().length}/{maxLength}文字</span>
            </div>
            <input type='text' id={name} name={name} placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} />
        </div>
    )
}


// fonts components
const fonts = [
    "Noto Sans JP", "Zen Kaku Gothic Antique", "BIZ UDPGothic", "Shippori Antique",
    "Zen Antique", "Zen Maru Gothic", "Mochiy Pop", "RocknRoll One"
]

export const Fonts = ({ title, onChange, name, value }) => {
    return (
        <div className='font'>
            <span className='title'>{title}</span>
            <div className='fontsGrid'>
                {fonts.map((item) =>
                    <label className='item' key={item}>
                        <input
                            id={`${name}-${item}`}
                            type="radio"
                            name={name}
                            value={item}
                            checked={value === item}
                            onChange={(e) => onChange(e)}
                        />
                        <span style={{ fontFamily: item }}>あア</span>
                    </label>
                )}
            </div>
        </div>
    )
}



// themes components
const themes = ["#333333", "#CC0000", "#FF8800", "#007E33", "#0099CC"]


export const Themes = ({ title, value, onChange, name }) => {
    return (
        <div className='theme'>
            <span className='title'>{title}</span>
            <div className='themesGrid'>
                {themes.map((item) =>
                    <label className='item' key={item}>
                        <input
                            id={`${name}-${item}`}
                            type="radio"
                            name={name}
                            value={item}
                            checked={value === item}
                            onChange={(e) => onChange(e)}
                        />
                        <span style={{ backgroundColor: item }}></span>
                    </label>
                )}
            </div>
        </div>
    )
}
