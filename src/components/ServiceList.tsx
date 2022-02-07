import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices, deleteService } from '../api';
import { useAppSelector } from '../hooks';
import { EditIcon, DeleteIcon } from './Icons';
import Spinner from './Spinner';

export default function ServiceList() {
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(
    (state) => state.serviceList.loadingStatus
  );
  const services = useAppSelector((store) => store.serviceList.services);
  const [update, setUpdate] = useState(Date.now());

  useEffect(() => {
    getServices();
  }, [update]);

  const handleEdit = (id: number) => {
    navigate(`/services/${id}`);
  };

  const handleDelete = (id: number) => {
    deleteService(id).then(() => {
      setUpdate(Date.now());
    });
  };

  if (loadingStatus === 'pending') {
    return <Spinner />;
  }

  if (loadingStatus === 'error') {
    return (
      <div className="list-group-item list-group-item-danger">
        Произошла ошибка!
      </div>
    );
  }

  return (
    <div className="list-group">
      {loadingStatus === 'success' &&
        services.map((o) => (
          <div
            key={o.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {o.name}: {o.price}
            </span>
            <div>
              <button
                className="btn btn-primary me-1"
                onClick={() => handleEdit(o.id)}
              >
                <EditIcon />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(o.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
