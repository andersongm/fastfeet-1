import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import renders from '../renders';
import DropdownMenu from '~/components/DropdownMenu';
import DeleteConfirm from '~/components/DeleteConfirm';
import crudActions from '~/constants/crudActions';

export default function Item({ columns, item, actions, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  function handleDelete(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <DeleteConfirm id={id} onClose={onClose} onDelete={onDelete} />;
      },
    });
  }

  return (
    <tr>
      {columns.map(column => (
        <td key={column.field}>{renders.render(item, column)}</td>
      ))}
      <td>
        <span>
          <MdMoreHoriz
            onClick={() => setOpen(value => !value)}
            size={30}
            color="#C6C6C6"
          />

          <DropdownMenu open={open} setOpen={setOpen} marginLeft="-145%">
            {actions.includes(crudActions.VIEW) && (
              <span>
                <MdVisibility size={23} color="#8E5BE8" />
                Visualizar
              </span>
            )}

            {actions.includes(crudActions.UPDATE) && (
              <span onClick={() => onEdit(item.id)}>
                <MdModeEdit size={23} color="#4D85EE" />
                Editar
              </span>
            )}

            {actions.includes(crudActions.DELETE) && (
              <span onClick={() => handleDelete(item.id)}>
                <MdDeleteForever size={23} color="#DE3B3B" />
                Excluir
              </span>
            )}
          </DropdownMenu>
        </span>
      </td>
    </tr>
  );
}

Item.propTypes = {
  columns: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
};
