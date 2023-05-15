const contractsModel = require('../models/contracts');

// Returns the list of contracts
module.exports.list = () => {
    return contractsModel.find()
    .then(contracts => {
        return contracts;
    })
    .catch(err => {
        throw err;
    }
    )
}

// Returns the contract with id
module.exports.getContract = id => {
    return contractsModel.findOne({ _id: id })
    .then(contract => {
        return contract;
    })
    .catch(err => {
        throw err;
    }
    )
}

// Returns the list of contracts made in year
module.exports.getContractsByYear = year => {
    // Date format: DD-MM-YYYY in string
    return contractsModel.find({ DataInicioContrato: { $regex: `../../${year}` } })
    .then(contracts => {
        return contracts;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Returns the list of contracts made in institution
module.exports.getContractsByInstitution = institution => {
    return contractsModel.find({ NomeInstituicao: { $regex: `.*${institution}.*` } })
    .then(contracts => {
        return contracts;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Returns the list of courses
module.exports.getCourses = () => {
    return contractsModel.distinct('Curso')
    .then(courses => {
        return courses;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Returns the list of institutions
module.exports.getInstitutions = () => {
    return contractsModel.distinct('NomeInstituicao')
    .then(institutions => {
        return institutions;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Adds a new contract
module.exports.add = contract => {
    return contractsModel.create(contract)
    .then(contract => {
        return contract;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Deletes a contract
module.exports.delete = id => {
    return contractsModel.deleteOne({ _id: id })
    .then(contract => {
        return contract;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

// Get all contracts with nipc
module.exports.getContractsByNipc = nipc => {
    console.log(nipc)
    return contractsModel.find({ NIPCInstituicao: nipc })
    .then(contracts => {
        return contracts;
    }
    )
    .catch(err => {
        throw err;
    }
    )
}

