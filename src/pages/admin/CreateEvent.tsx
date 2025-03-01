import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/shared.css';
import '../../styles/admin/CreateEvent.css';
import { v4 as uuidv4 } from 'uuid';

interface EventForm {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface Product {
  id: string;
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
    id: '',
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
    const productWithId = {
      ...newProduct,
      id: uuidv4()
    };
    setProducts(prev => [...prev, productWithId]);
    setNewProduct({
      id: '',
      name: '',
      price: 0,
      imageUrl: '',
      description: '',
      type: 'Ingresso'
    });
  };

  const handleSubmit = () => {
    const newEvent = {
      id: uuidv4(),
      ...eventForm,
      products,
      createdAt: new Date().toISOString()
    };

    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]));
    
    navigate('/admin/events-list', { 
      state: { message: 'Evento criado com sucesso!' } 
    });
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
                required
              />
            </div>

            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                name="date"
                value={eventForm.date}
                onChange={handleEventChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                name="location"
                value={eventForm.location}
                onChange={handleEventChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="description"
                value={eventForm.description}
                onChange={handleEventChange}
                required
              />
            </div>

            <div className="form-group">
              <label>URL da Imagem do Evento</label>
              <input
                type="text"
                name="imageUrl"
                value={eventForm.imageUrl}
                onChange={handleEventChange}
                placeholder="https://exemplo.com/imagem.jpg"
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
                onClick={() => {
                  if (eventForm.title && eventForm.date && eventForm.location) {
                    setStep(2);
                  } else {
                    alert('Preencha os campos obrigatórios');
                  }
                }}
              >
                Próximo: Adicionar Produtos
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Produtos do Evento: {eventForm.title}</h2>
            
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
                  placeholder="https://exemplo.com/produto.jpg"
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
                disabled={!newProduct.name || newProduct.price <= 0}
              >
                Adicionar Produto
              </button>
            </div>
            
            <div className="products-list">
              <h3>Produtos Adicionados ({products.length})</h3>
              
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