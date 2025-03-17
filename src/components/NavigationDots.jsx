import React from 'react'

const NavigationDots = ({ active }) => {
    return (
        <div className='app__navigation'>
            {['home', 'services', 'portfolio', 'compétences', /*'testimonials'*/, 'contact'].map((item, index) => (
                <a 
                    href={`#${item}`}
                    key={item + index}
                    className="app__navigation-dot"
                    style={active === item ? { backgroundColor: '#b92727'} : { }}
                />
            ))}
        </div>
    )
}

export default NavigationDots