import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices, deleteService } from '../api';
import { useAppSelector } from '../hooks';
import ErrorMessage from './ErrorMessage';
import { EditIcon, DeleteIcon } from './Icons';
import Spinner from './Spinner';

export default function ServiceList() {
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(
    (store) => store.serviceList.loadingStatus
  );
  const deletingStatuses = useAppSelector(
    (store) => store.serviceList.deletingStatuses
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
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (loadingStatus === 'error') {
    return <ErrorMessage message="Произошла ошибка!" />;
  }

  return (
    <div className="list-group">
      {services &&
        services.map((o, i) => (
          <div
            key={o.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {o.name}: {o.price}
            </span>
            {deletingStatuses[i] !== 'pending' ? (
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
            ) : (
              <div>
                <button className="btn btn-danger" disabled>
                  <Spinner small={true} />
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
