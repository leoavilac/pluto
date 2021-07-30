import PropTypes from 'prop-types'

const ReportsList = () => {
    return (
        <div>
            <p>Zona de reportes:</p>
            <div className="list-group">
                <a href="/datos_almacenados" className="list-group-item list-group-item-action">Datos Almacenados</a>
                <a href="/top10_paises" className="list-group-item list-group-item-action">Top 10 de Países</a>
                <a href="/total_por_edad" className="list-group-item list-group-item-action">Gráfica - Rango de edades por país</a>
                <a href="/total_por_genero" className="list-group-item list-group-item-action">Gráfica - Vacunados por género</a>
            </div>
        </div>
    )
}

ReportsList.defaultProps = {
}

ReportsList.propTypes = {
}

export default ReportsList