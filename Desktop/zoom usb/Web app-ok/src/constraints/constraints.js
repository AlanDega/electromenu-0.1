import { validate } from 'validate.js'

const constraints = {
    confirmPassword: {
        presence: true,
        equality: "password",
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    prefix: {
        presence: true,
        length: {
            minimum: 1
        }
    },
    email: {
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    title: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    description: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 140
        }
    },
    restaurant_title: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 60
        }
    },
    restaurant_description: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 140
        }
    },
    restaurant_direccion: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    restaurant_telefonos: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    restaurant_gps_coords: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    category_title: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 15
        }
    },
    category_description: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    category: {
        presence: true,
        length: {
            minimum: 5
        }
    },
    price: {
        presence: true,
        numericality: {
            greaterThan: 0
        }
    },
    type: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 6
        }
    },
    mongoUrl: {
        url: {
            scheme: ['mongodb']
        }
    },
    currencyCode: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 3
        }
    },
    currencySymbol: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 3
        }
    },
    reason: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 30
        }
    },
    optionTitle: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 30
        }
    },
    optionDescription: {
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    optionPrice: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 0
        }
    },
    addonTitle: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 60
        }
    },
    addonDescription: {
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    addonQuantityMinimum: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 0
        }
    },
    addonQuantityMaximum: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 1
        }
    },
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] })
}
