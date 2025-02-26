import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

interface EventForm {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface Product {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

export default function CreateEvent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [eventForm, setEventForm] = useState<EventForm>({
    title: '',
    date: '',
    location: '',
    description: '',
    imageUrl: ''
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    type: 'Ingresso'
  });

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleAddProduct = () => {
    setProducts(prev => [...prev, newProduct]);
    setNewProduct({
      name: '',
      price: 0,
      imageUrl: '',
      description: '',
      type: 'Ingresso'
    });
  };

  const handleSubmit = () => {
    // Aqui adicionaríamos a lógica para salvar o evento e seus produtos
    // Por enquanto, vamos apenas simular um salvamento bem-sucedido
    navigate('/admin/events-list');
  };

  return (
    <div className="create-event-container">
      <div className="page-header">
        <h1>Novo Evento</h1>
      </div>

      <div className="create-event-card">
        {step === 1 ? (
          <>
            <h2>Informações do Evento</h2>
            <div className="form-group">
              <label>Nome do Evento</label>
              <input
                type="text"
                name="title"
                value={eventForm.title}
                onChange={handleEventChange}
              />
            </div>

            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                name="date"
                value={eventForm.date}
                onChange={handleEventChange}
              />
            </div>

            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                name="location"
                value={eventForm.location}
                onChange={handleEventChange}
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="description"
                value={eventForm.description}
                onChange={handleEventChange}
              />
            </div>

            <div className="form-group">
              <label>URL da Imagem do Evento</label>
              <input
                type="text"
                name="imageUrl"
                value={eventForm.imageUrl}
                onChange={handleEventChange}
              />
            </div>

            <div className="form-buttons">
              <button 
                className="button-secondary" 
                onClick={() => navigate('/admin/events-list')}
              >
                Cancelar
              </button>
              <button 
                className="button-primary" 
                onClick={() => setStep(2)}
              >
                Próximo: Adicionar Produtos
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Produtos do Evento</h2>
            
            <div className="product-form">
              <h3>Adicionar Novo Produto</h3>
              
              <div className="form-group">
                <label>Nome do Produto</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleProductChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleProductChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Tipo</label>
                  <select 
                    name="type" 
                    value={newProduct.type}
                    onChange={handleProductChange}
                  >
                    <option value="Ingresso">Ingresso</option>
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleProductChange}
                />
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleProductChange}
                />
              </div>
              
              <button 
                className="button-accent" 
                onClick={handleAddProduct}
              >
                Adicionar Produto
              </button>
            </div>
            
            <div className="products-list">
              <h3>Produtos Adicionados</h3>
              
              {products.length === 0 ? (
                <p className="empty-products">Nenhum produto adicionado ainda</p>
              ) : (
                <div className="product-cards">
                  {products.map((product, index) => (
                    <div key={index} className="product-card">
                      <h4>{product.name}</h4>
                      <p className="product-price">R$ {product.price.toFixed(2)}</p>
                      <p className="product-type">{product.type}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-buttons">
              <button 
                className="button-secondary" 
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button 
                className="button-primary" 
                onClick={handleSubmit}
              >
                Concluir Evento
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 