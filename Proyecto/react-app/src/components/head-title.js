import PropTypes from 'prop-types'

const HeadTitle = ({ title, subtitle }) => {
    return (
        <header>
            <h1><strong>{ title }</strong></h1>
            <h4 className="text-muted">{ subtitle }</h4>
            <hr />
        </header>
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