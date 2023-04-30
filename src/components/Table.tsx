import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, Tag } from 'antd';
import { Colors, IOptions, IPokemon, IPokemonsData } from '../store/models/IPokemon';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { fetchAllTypes, fetchPokemonsUrl, fetchPokemons } from '../store/reducers/ActionCreators';
import { ColumnsType } from 'antd/es/table';

interface IModal {
  baseExp: number;
  abilities: string[];
  isOpen: boolean;
}


const PokemonTable = () => {
  const [tablePagination, setTablePagination] = useState({
    currentPage: 1,
    pageSize: 20
  });
  const dispatch = useAppDispatch();
  const {
    modifiedPokemons,
    count,
    isLoading,
  } = useAppSelector((state) => state.pokemonReducer);
  const [tempPokemons, setTempPokemons] = useState<IPokemonsData>({
    count: 0,
    modifiedPokemons: []
  });
  const [modal, setModalInfo] = useState<IModal>({
    isOpen: false,
    baseExp: 0,
    abilities: []
  });

  useEffect(() => {
    setTempPokemons({
      modifiedPokemons: modifiedPokemons.map((pokemon, i) => ({
        ...pokemon,
        key: i + 1
      })), count
    });
  }, [modifiedPokemons]);

  useEffect(() => {
    dispatch(fetchPokemonsUrl({ limit: tablePagination.pageSize, offset: (tablePagination.currentPage - 1) * tablePagination.pageSize }))
  }, [tablePagination.currentPage, tablePagination.pageSize]);

  useEffect(() => {
    dispatch(fetchAllTypes());
  }, []);

  const columns: ColumnsType<IPokemon> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: IPokemon, b: IPokemon) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (record: string) => <img src={record} alt={record} />,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (record: any) =>
        record.map((type: any, i: number) =>
          <Tag key={i} color={Colors[type]}>{type}</Tag>
        )

    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Modal',
      key: 'modal',
      render: (record: IPokemon) => {
        return (
          <Button
            type="primary"
            onClick={() => showModal({
              baseExp: record.base_experience,
              abilities: record.abilities,
              isOpen: true
            })}
          >
            Open
          </Button>
        )
      },
    },
  ]

  const showModal = (modalData: IModal) => {
    setModalInfo(modalData);
  };

  const handleOk = () => {
    setModalInfo((options) => ({ ...options, isOpen: false }));
  };

  const handleCancel = () => {
    setModalInfo((options) => ({ ...options, isOpen: false }));
  };

  return (
    <div className="table-container">
      <Modal
        title="Additional information"
        open={modal.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p style={{ fontWeight: 'bold' }}>Base experience: <span style={{ fontWeight: 400 }}>{modal.baseExp}</span></p>
        <p style={{ fontWeight: 'bold' }}>Abilities: {modal.abilities.map((ability, i) => <span style={{ fontWeight: 400 }} key={i}>&lt;{ability}&gt;</span>)}</p>
      </Modal>
      <div className="search-container">
        <div>
          <Input
            placeholder="Enter pokemon name"
            allowClear={true}
            onChange={({ target: { value } }) => {
              setTempPokemons((pokemons) => {
                console.log(modifiedPokemons);
                return {
                  count: pokemons.count,
                  modifiedPokemons: modifiedPokemons.filter((pokemon) => pokemon.name.includes(value)).map((pokemon, i: number) => ({ ...pokemon, key: i }))
                };
              });
            }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tempPokemons.modifiedPokemons}
        pagination={{
          total: tempPokemons.count,
          onChange: (page, pageSize) => {
            setTablePagination((options) => ({ ...options, pageSize, currentPage: page }));
          },
          hideOnSinglePage: true,
          pageSize: tablePagination.pageSize,
          current: tablePagination.currentPage,
          pageSizeOptions: [10, 20, 50]
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default PokemonTable;