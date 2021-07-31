import PropTypes from 'prop-types'

const HeadTitle = ({ title, subtitle }) => {
    return (
        <div style={{border: 1, backgroundColor:"lightgray", textAlign:"center"}}>
            <header>
                <h1><strong>{ title }</strong></h1>
                <h4 className="text-muted">{ subtitle }</h4>

            </header>
        </div>
    )
}

HeadTitle.defaultProps = {
    title : 'P L U T O',
    subtitle : 'Sistemas Operativos 1',
}

HeadTitle.propTypes = {
    title : PropTypes.string,
    subtitle : PropTypes.string,
}

export default HeadTitle