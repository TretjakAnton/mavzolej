exports.createMonument = (model) => {
  return {
    db_type: 'pam',
    id_pam: model.id_pam,
    price: model.price,
    type: model.type,
    images: [...model.images]
  }
};

exports.createMenu = (model) => {
  return {
    db_type: 'menu',
    menu_name: model.menu_name,
  }
};

exports.createType = (model) => {
  return {
    db_type: 'type',
    name: model.name,
    folder: model.folder,
    menu_name: model.menu_name,
  }
};

exports.createFields = (model) => {
  return {
    db_type: 'field',
    type: model.type,
    name: model.name,
    description: model.description,
    price: model.price,
  }
};
