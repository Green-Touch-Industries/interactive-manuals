import { useState, useEffect } from 'react';
import { 
  Check, 
  ShieldAlert, 
  Clock, 
  Play, 
  Wrench, 
  X, 
  Maximize2, 
  Info, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  Settings
} from 'lucide-react';

const productCatalog = [
  {
    category: 'Open Enclosed (Trimmer) Racks',
    categoryEs: 'Soportes Abiertos / Cerrados (Trimmer)',
    products: [
      { id: 'xtreme-pro', title: 'Trimmer Racks', titleEs: 'Soportes de Cortabordes', subtitle: 'XA102, XB103, XC104', image: '/assets/manuals/xtreme-pro/hero.png', status: 'active' },
      { id: 'bps100', title: 'BPS100 Blower Rack', titleEs: 'Soporte de Soplador BPS100', subtitle: 'Backpack Blower Rack', image: '/assets/manuals/bps100/hero.png', status: 'active' },
      { id: 'spc21', title: 'SPC21 Sprayer Cage', titleEs: 'Jaula de Rociador SPC21', subtitle: 'Lockable Sprayer Cage', image: '/assets/manuals/spc21/hero.png', status: 'active' },
      { id: 'tbx100', title: 'Unibox Storage System', titleEs: 'Sistema de Almacenamiento Unibox', subtitle: 'SKU: TBX100', image: '/assets/manuals/tbx100/hero.png', status: 'active' },
      { id: 'fcl100', title: '5-Gallon Fuel Can Cage', titleEs: 'Jaula de Combustible de 5 Galones', subtitle: 'SKU: FCL100-GRE', image: '/assets/manuals/fcl100/hero.png', status: 'active' },
      { id: 'vpr21', title: 'Racing Fuel Can Cage', titleEs: 'Jaula de Combustible de Carreras', subtitle: 'SKU: VPR21', image: '/assets/manuals/vpr21/hero.png', status: 'active' },
      { id: 'x101', title: 'Mid-Mount Hedge Support', titleEs: 'Soporte de Cortasetos', subtitle: 'SKU: X101-GRE-OPEN', image: '/assets/manuals/x101/hero.png', status: 'active' }
    ]
  },
  {
    category: 'Classic Open Trailer Racks',
    categoryEs: 'Soportes de Remolque Abierto Classic',
    products: [
      { id: 'classic-trimmer', title: 'Classic Trimmer Racks', titleEs: 'Soportes de Cortabordes Classic', subtitle: 'LA011 & LB012', image: '/assets/manuals/classic-trimmer/hero.png', status: 'active' },
      { id: 'classic-enclosed', title: 'Classic Enclosed Trimmer Racks', titleEs: 'Soportes de Cortabordes Cerrados Classic', subtitle: 'SKU: LE015', image: '/assets/manuals/classic-enclosed/hero.png', status: 'active' },
      { id: 'xe106', title: 'Water Cooler Rack', titleEs: 'Soporte de Enfriador de Agua', subtitle: 'SKU: XE106-GRE', image: '/assets/manuals/xe106/hero.png', status: 'active' },
      { id: 'xf107', title: 'Classic Sprayer Rack', titleEs: 'Soporte de Rociador Classic', subtitle: 'SKU: XF107-GRE', image: '/assets/manuals/xf107/hero.png', status: 'active' },
      { id: 'classic-handtool', title: 'Hand Tool Racks', titleEs: 'Soportes de Herramientas Manuales', subtitle: 'TA051-GRE & TC053-GRE', image: '/assets/manuals/classic-handtool/hero.png', status: 'active' },
      { id: 'ha041', title: 'Locking Hedge Trimmer Rack', titleEs: 'Soporte de Cortasetos con Llave', subtitle: 'SKU: HA041', image: '/assets/manuals/ha041/hero.png', status: 'active' },
      { id: 'xd105', title: 'Line Spool Rack & Cutter', titleEs: 'Soporte de Carrete de Hilo', subtitle: 'SKU: XD105', image: '/assets/manuals/xd105/hero.png', status: 'active' },
      { id: 'bj040', title: 'Lockable Power Tool Rack', titleEs: 'Soporte de Herramientas Eléctricas', subtitle: 'SKU: BJ040', image: '/assets/manuals/bj040/hero.png', status: 'active' },
      { id: 'td21', title: 'Lockable Shovel & Tool Rack', titleEs: 'Soporte de Pala con Llave', subtitle: 'SKU: TD21-GRE', image: '/assets/manuals/td21/hero.png', status: 'active' }
    ]
  },
  {
    category: 'Mounting Solutions',
    categoryEs: 'Soluciones de Montaje',
    products: [
      { id: 'wc001', title: 'Fastrap Mower Wheel Lock', titleEs: 'Bloqueo de Ruedas Fastrap', subtitle: 'SKU: WC001', image: '/assets/manuals/wc001/hero.png', status: 'active' },
      { id: 'ei086', title: 'Stake Pocket Adapter', titleEs: 'Adaptador de Bolsillo de Estaca', subtitle: 'SKU: EI086', image: '/assets/manuals/ei086/hero.png', status: 'active' },
      { id: 'esk100-kit', title: 'Engine Support Kit', titleEs: 'Kit de Soporte de Motor', subtitle: 'SKU: ESK100', image: '/assets/manuals/esk100-kit/hero.png', status: 'active' },
      { id: 'rc103', title: 'UTV Bed Rail System (RC103)', titleEs: 'Sistema de Riel de Cama UTV (RC103)', subtitle: 'Club Car Carryall UTV Mount', image: '/assets/manuals/rc103/hero.png', status: 'active' },
      { id: 'rd104', title: 'UTV Bed Rail System (RD104)', titleEs: 'Sistema de Riel de Cama UTV (RD104)', subtitle: "Lowe's Axis 500 UTV Mount", image: '/assets/manuals/rd104/hero.png', status: 'active' },
      { id: 'ra101', title: 'UTV Bed Rail System (RA101)', titleEs: 'Sistema de Riel de Cama UTV (RA101)', subtitle: 'Universal Bed Rail (RA101 / RBP204)', image: '/assets/manuals/ra101/hero.png', status: 'active' },
      { id: 'aa101', title: 'Truck Bed Rail System', titleEs: 'Sistema de Riel de Cama de Camión', subtitle: 'SKU: AA101', image: '/assets/manuals/aa101/hero.png', status: 'active' },
      { id: 'cx115', title: 'Enclosed Offset Brackets', titleEs: 'Soportes de Desplazamiento Cerrados', subtitle: 'SKU: CX115', image: '/assets/manuals/cx115/hero.png', status: 'active' },
      { id: 'pgo011', title: 'Multi-Tool Garage Organizer', titleEs: 'Organizador de Garaje', subtitle: 'SKU: PGO011', image: '/assets/manuals/pgo011/hero.png', status: 'active' }
    ]
  }
];

// Base path asset resolver
const getAssetUrl = (path) => {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

function App() {
  // Determine if we should show staging manuals on mount
  const checkStaging = () => {
    if (typeof window === 'undefined') return false;
    const searchParams = new URLSearchParams(window.location.search);
    // Explicit staging=false overrides staging hostname checks
    if (searchParams.get('staging') === 'false') return false;
    
    return searchParams.get('staging') === 'true' || 
           window.location.hostname.includes('staging') || 
           window.location.hostname.includes('localhost') || 
           window.location.hostname.includes('127.0.0.1') ||
           window.location.hostname.includes('gti-staging.local');
  };

  const isStaging = checkStaging();

  // Navigation states
  const [selectedProduct, setSelectedProduct] = useState(isStaging ? null : 'xtreme-pro'); // 'xtreme-pro', 'bps100', 'spc21', 'wc001', or null
  const [selectedCategory, setSelectedCategory] = useState(null); // 'Open Enclosed (Trimmer) Racks', 'Classic Open Trailer Racks', 'Mounting Solutions', or null
  const [selectedModel, setSelectedModel] = useState(null); // Sub-model for trimmer racks, or product title for others
  const [selectedConfig, setSelectedConfig] = useState(null); // 'open', 'round', 'advanced', 'enclosed', etc.
  
  const [lang, setLang] = useState('en');
  const [unit, setUnit] = useState('us'); // 'us' or 'metric'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeSubStepIndex, setActiveSubStepIndex] = useState(0);
  const [manualData, setManualData] = useState(null);
  
  // Interactive Checklist states
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedPanels, setExpandedPanels] = useState({
    hardware: true,
    tools: true
  });
  
  // Modal states
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [activeSymptom, setActiveSymptom] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Fetch product manual data dynamically when selectedProduct changes
  useEffect(() => {
    if (!selectedProduct) {
      setManualData(null);
      return;
    }
    
    const filename = selectedProduct ? `${selectedProduct}.json` : null;
                     
    if (filename) {
      fetch(getAssetUrl(`/manuals/${filename}`))
        .then((res) => res.json())
        .then((data) => {
          setManualData(data);
          // For products without sub-models, set selectedModel directly to product title to bypass sub-model screen
          if (selectedProduct !== 'xtreme-pro') {
            setSelectedModel(data.title);
          }
        })
        .catch((err) => console.error("Error loading manual data:", err));
    }
  }, [selectedProduct]);

  // Reset active sub-step index when changing steps
  useEffect(() => {
    setActiveSubStepIndex(0);
  }, [currentStepIndex]);

  // Helper to fetch translated text safely supporting both schema structures
  const t = (obj, language = lang) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj['en'] || '';
  };

  const getTxt = (item, fieldName) => {
    if (!item) return '';
    const val = item[fieldName];
    if (typeof val === 'object' && val !== null) {
      return val[lang] || val['en'] || '';
    }
    if (lang === 'es' && item.translation?.es?.[fieldName]) {
      return item.translation.es[fieldName];
    }
    return val || '';
  };

  const getArray = (item, fieldName) => {
    if (!item) return [];
    if (lang === 'es' && item.translation?.es?.[fieldName]) {
      return item.translation.es[fieldName];
    }
    const val = item[fieldName];
    if (Array.isArray(val)) return val;
    return [];
  };

  // Toggle collapsible sections
  const togglePanel = (panel) => {
    setExpandedPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  // Toggle checklist item
  const toggleCheckItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Dynamic calculations for hardware sets based on active trimmer rack model
  const getDynamicHardwareQty = (hwId, originalQty) => {
    if (selectedProduct !== 'xtreme-pro' || !selectedModel) return originalQty;
    if (hwId === 'E') {
      // Upper Lip (Hex Bolts & Washers): 2 sets for XA102, 3 sets for XB103, 4 sets for XC104
      const sets = selectedModel === 'XA102' ? 2 : selectedModel === 'XB103' ? 3 : 4;
      return lang === 'en' ? `${sets} Sets` : `${sets} Juegos`;
    }
    if (hwId === 'F') {
      // Lower Lip (Allen Bolts & Nyloc Nuts): 8 sets for XA102, 12 sets for XB103, 16 sets for XC104
      const sets = selectedModel === 'XA102' ? 8 : selectedModel === 'XB103' ? 12 : 16;
      return lang === 'en' ? `${sets} Sets` : `${sets} Juegos`;
    }
    return originalQty;
  };

  // Dynamic content calculations (e.g. measurements in Metric vs. US Standard)
  const formatMeasurementText = (text) => {
    if (!text) return '';
    if (unit === 'metric') {
      // Convert standard center-to-center spacing 36 3/4" to ~93.3 cm
      return text
        .replace(/36 3\/4"/g, '93.3 cm')
        .replace(/36.75"/g, '93.3 cm')
        .replace(/1\/2"/g, '12.7 mm')
        .replace(/1 1\/2"/g, '3.8 cm')
        .replace(/1.5"/g, '3.8 cm')
        .replace(/3\/4"/g, '1.9 cm')
        .replace(/4"/g, '10.2 cm')
        .replace(/5mm/g, '5 mm')
        .replace(/10mm/g, '10 mm')
        .replace(/16"/g, '40.6 cm');
    }
    return text;
  };

  // Filter steps dynamically based on selected mounting configuration
  const steps = manualData ? (manualData.steps || []).filter(step => {
    // If step category is not specified or is "all", always show it
    if (!step.category || step.category === 'all') return true;
    // Otherwise, show only if it matches the selected configuration category
    return step.category === selectedConfig;
  }) : [];

  const currentStep = steps[currentStepIndex];
  
  // Extract sub-steps for ESK100 or other multi-step instructions
  const subSteps = currentStep ? getArray(currentStep, 'subSteps') : [];
  const hasSubSteps = subSteps.length > 0;
  const activeSubStep = hasSubSteps ? subSteps[activeSubStepIndex] : null;

  // Advance workflow (handles sub-steps before major steps)
  const handleAdvance = () => {
    if (hasSubSteps && activeSubStepIndex < subSteps.length - 1) {
      setActiveSubStepIndex(prev => prev + 1);
    } else {
      setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Backwards workflow (handles sub-steps before major steps)
  const handlePrevious = () => {
    if (hasSubSteps && activeSubStepIndex > 0) {
      setActiveSubStepIndex(prev => prev - 1);
    } else {
      const prevIdx = currentStepIndex - 1;
      if (prevIdx >= 0) {
        const prevStep = steps[prevIdx];
        const prevSubSteps = getArray(prevStep, 'subSteps');
        setCurrentStepIndex(prevIdx);
        if (prevSubSteps.length > 0) {
          setActiveSubStepIndex(prevSubSteps.length - 1);
        } else {
          setActiveSubStepIndex(0);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset application to main menu
  const resetToMainMenu = () => {
    setSelectedProduct(isStaging ? null : 'xtreme-pro');
    setSelectedCategory(null);
    setSelectedModel(null);
    setSelectedConfig(null);
    setCurrentStepIndex(0);
    setActiveSubStepIndex(0);
    setCheckedItems({});
    setExpandedPanels({ hardware: true, tools: true });
  };

  const selectedProductInfo = productCatalog
    .flatMap(cat => cat.products)
    .find(p => p.id === selectedProduct);
  const isComingSoon = selectedProductInfo && selectedProductInfo.status === 'coming-soon';

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="app-header glass-panel">
        <div className="logo-section" style={{ cursor: 'pointer' }} onClick={resetToMainMenu}>
          <div className="logo-title">Green Touch Industries</div>
          <div className="logo-subtitle">
            {selectedProduct && manualData 
              ? `${t(manualData.title)} • Instruction Manual` 
              : 'Instructional Interactivity'}
          </div>
        </div>
        
        <div className="controls-section">
          {/* Language Toggle */}
          <button 
            className={`toggle-button ${lang === 'es' ? 'active' : ''}`}
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          >
            ESPAÑOL
          </button>
          
          {/* Unit Toggle */}
          <button 
            className="toggle-button"
            onClick={() => setUnit(unit === 'us' ? 'metric' : 'us')}
          >
            {unit === 'us' ? 'US STD' : 'METRIC'}
          </button>

          {/* Change Model Button (For Trimmer Racks) */}
          {selectedProduct === 'xtreme-pro' && selectedModel && (
            <button 
              className="toggle-button"
              onClick={() => {
                setSelectedModel(null);
                setCurrentStepIndex(0);
                setActiveSubStepIndex(0);
                setCheckedItems({});
              }}
            >
              {lang === 'en' ? 'Change Model' : 'Cambiar Modelo'}
            </button>
          )}

          {/* Change Manual Button (Staging Only) */}
          {selectedProduct && isStaging && (
            <button 
              className="toggle-button"
              onClick={resetToMainMenu}
            >
              {lang === 'en' ? 'Change Manual' : 'Cambiar Manual'}
            </button>
          )}
          
          <div className="build-version">v2026.06.26 Build</div>
        </div>
      </header>

      {/* 1. PRODUCT DASHBOARD (MAIN MENU) */}
      {!selectedProduct && (
        <main className="display-pane" style={{ animation: 'fade-in 0.5s', padding: '2rem 1.5rem', flex: 1 }}>
          <div className="display-title-section" style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
            <h1 className="display-title" style={{ fontSize: '3rem', textTransform: 'uppercase' }}>
              {lang === 'en' ? 'Interactive Setup Manuals' : 'Manuales de Configuración Interactivos'}
            </h1>
            <p className="step-text" style={{ fontSize: '1rem', marginTop: '1rem', color: 'var(--text-gray)' }}>
              {lang === 'en' 
                ? 'Select a category below to browse the available step-by-step interactive installation manuals, parts checklists, and field diagnostics.' 
                : 'Seleccione una categoría a continuación para examinar los manuales de instalación interactivos paso a paso, listas de piezas y diagnósticos.'}
            </p>
          </div>

          {/* LOBBY VIEW (3 CATEGORIES) */}
          {!selectedCategory ? (
            <div className="lobby-container">
              {/* Category 1: Open Enclosed (Trimmer) Racks */}
              <div className="lobby-category-card" onClick={() => setSelectedCategory('Open Enclosed (Trimmer) Racks')}>
                <div className="lobby-image-wrapper">
                  <img 
                    src={getAssetUrl('/assets/manuals/xtreme-pro/hero.png')} 
                    alt="Open Enclosed (Trimmer) Racks" 
                    className="lobby-image"
                    onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                  />
                </div>
                <div className="lobby-card-body">
                  <h3 className="lobby-card-title">
                    {lang === 'en' ? 'Open Enclosed (Trimmer) Racks' : 'Soportes Abiertos / Cerrados (Trimmer)'}
                  </h3>
                  <p className="lobby-card-subtitle">
                    {lang === 'en' 
                      ? 'Premium commercial-grade security racks and lockable cages' 
                      : 'Soportes de seguridad de grado comercial premium y jaulas con llave'}
                  </p>
                </div>
                <div className="lobby-card-arrow">
                  &rarr;
                </div>
              </div>

              {/* Category 2: Classic Open Trailer Racks */}
              <div className="lobby-category-card" onClick={() => setSelectedCategory('Classic Open Trailer Racks')}>
                <div className="lobby-image-wrapper">
                  <img 
                    src={getAssetUrl('/assets/manuals/classic-trimmer/hero.png')} 
                    alt="Classic Open Trailer Racks" 
                    className="lobby-image"
                    onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                  />
                </div>
                <div className="lobby-card-body">
                  <h3 className="lobby-card-title">
                    {lang === 'en' ? 'Classic Open Trailer Racks' : 'Soportes de Remolque Abierto Classic'}
                  </h3>
                  <p className="lobby-card-subtitle">
                    {lang === 'en' 
                      ? 'Heavy-duty lockable steel racks for open and enclosed trailers' 
                      : 'Soportes de acero con cerradura para remolques abiertos y cerrados'}
                  </p>
                </div>
                <div className="lobby-card-arrow">
                  &rarr;
                </div>
              </div>

              {/* Category 3: Mounting Solutions */}
              <div className="lobby-category-card" onClick={() => setSelectedCategory('Mounting Solutions')}>
                <div className="lobby-image-wrapper">
                  <img 
                    src={getAssetUrl('/assets/manuals/ei086/hero.png')} 
                    alt="Mounting Solutions" 
                    className="lobby-image"
                    onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                  />
                </div>
                <div className="lobby-card-body">
                  <h3 className="lobby-card-title">
                    {lang === 'en' ? 'Mounting Solutions' : 'Soluciones de Montaje'}
                  </h3>
                  <p className="lobby-card-subtitle">
                    {lang === 'en' 
                      ? 'No-drill pocket adapters, engine support kits, UTV rails and wall organization' 
                      : 'Adaptadores sin perforaciones, soportes de motor y rieles UTV'}
                  </p>
                </div>
                <div className="lobby-card-arrow">
                  &rarr;
                </div>
              </div>
            </div>
          ) : (
            /* CATEGORY CATALOG VIEW */
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-dim)', paddingBottom: '1rem' }}>
                <h2 className="category-title" style={{ margin: 0 }}>
                  {lang === 'en' 
                    ? selectedCategory 
                    : selectedCategory === 'Open Enclosed (Trimmer) Racks' ? 'Soportes Abiertos / Cerrados (Trimmer)' : selectedCategory === 'Classic Open Trailer Racks' ? 'Soportes de Remolque Abierto Classic' : 'Soluciones de Montaje'}
                </h2>
                <button 
                  className="toggle-button"
                  onClick={() => setSelectedCategory(null)}
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', padding: '0.5rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-dim)', cursor: 'pointer' }}
                >
                  {lang === 'en' ? '← Back to Categories' : '← Volver a Categorías'}
                </button>
              </div>

              <div className="lobby-container" style={{ margin: 0, padding: 0 }}>
                {productCatalog
                  .find(cat => cat.category === selectedCategory)
                  ?.products.map((prod) => (
                    <div 
                      key={prod.id} 
                      className="lobby-category-card"
                      onClick={() => setSelectedProduct(prod.id)}
                    >
                      <div className="lobby-image-wrapper">
                        <img 
                          src={getAssetUrl(prod.image)} 
                          alt={prod.title} 
                          className="lobby-image"
                          onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                        />
                      </div>
                      <div className="lobby-card-body">
                        <h3 className="lobby-card-title">
                          {lang === 'en' ? prod.title : (prod.titleEs || prod.title)}
                        </h3>
                        <p className="lobby-card-subtitle">{prod.subtitle}</p>
                      </div>
                      <div className="lobby-card-arrow">
                        &rarr;
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* 1.5 COMING SOON SCREEN */}
      {selectedProduct && isComingSoon && (
        <main className="display-pane" style={{ animation: 'fade-in 0.5s', padding: '4rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', padding: '3rem 2rem', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
            <div style={{ color: 'var(--text-green-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <Settings size={48} className="animate-spin-slow" />
            </div>
            <h2 style={{ fontSize: '2.2rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-white)' }}>
              {lang === 'en' ? 'Coming Soon' : 'Próximamente'}
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
              {lang === 'en' 
                ? `The interactive setup manual for the ${selectedProductInfo.title} is currently under construction in our staging environment.`
                : `El manual de instalación interactivo para ${selectedProductInfo.titleEs || selectedProductInfo.title} está actualmente en construcción en nuestro entorno de pruebas.`}
            </p>
            <button 
              className="action-btn"
              onClick={resetToMainMenu}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', border: 'none', background: 'var(--text-green-primary)', color: '#000', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
            >
              {lang === 'en' ? 'Back to Dashboard' : 'Volver al Panel'}
            </button>
          </div>
        </main>
      )}

      {/* 2. SUB-MODEL SELECTION SCREEN (FOR TRIMMER RACKS ONLY) */}
      {selectedProduct === 'xtreme-pro' && !selectedModel && (
        <main className="display-pane" style={{ animation: 'fade-in 0.5s', padding: '2rem 1.5rem', flex: 1 }}>
          <div className="display-title-section" style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
            <h1 className="display-title" style={{ fontSize: '3rem', textTransform: 'uppercase' }}>
              {lang === 'en' ? 'Select Your Rack Model' : 'Seleccione Su Modelo De Soporte'}
            </h1>
            <p className="step-text" style={{ fontSize: '1rem', marginTop: '1rem', color: 'var(--text-gray)' }}>
              {lang === 'en' 
                ? 'To ensure accurate hardware quantities and assembly steps, please select the trimmer rack model you purchased.' 
                : 'Para garantizar las cantidades de herrajes y los pasos de ensamblaje correctos, seleccione el modelo de soporte que compró.'}
            </p>
          </div>

          <div className="dashboard-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* XA102 Card */}
            <div className="dashboard-card" onClick={() => setSelectedModel('XA102')}>
              <div className="card-image-wrapper">
                <img 
                  src={getAssetUrl('/assets/manuals/xtreme-pro/rack2.png')} 
                  alt="XA102" 
                  className="card-image"
                  onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">XA102</h3>
                <p className="card-subtitle">{lang === 'en' ? '2 Position Rack' : 'Soporte de 2 Posiciones'}</p>
              </div>
            </div>

            {/* XB103 Card */}
            <div className="dashboard-card" onClick={() => setSelectedModel('XB103')}>
              <div className="card-image-wrapper">
                <img 
                  src={getAssetUrl('/assets/manuals/xtreme-pro/rack3.png')} 
                  alt="XB103" 
                  className="card-image"
                  onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">XB103</h3>
                <p className="card-subtitle">{lang === 'en' ? '3 Position Rack' : 'Soporte de 3 Posiciones'}</p>
              </div>
            </div>

            {/* XC104 Card */}
            <div className="dashboard-card" onClick={() => setSelectedModel('XC104')}>
              <div className="card-image-wrapper">
                <img 
                  src={getAssetUrl('/assets/manuals/xtreme-pro/rack4.png')} 
                  alt="XC104" 
                  className="card-image"
                  onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">XC104</h3>
                <p className="card-subtitle">{lang === 'en' ? '4 Position Rack' : 'Soporte de 4 Posiciones'}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 3. INTERACTIVE MANUAL VIEWER */}
      {selectedProduct && selectedModel && manualData && (
        <div className="main-content" style={{ animation: 'fade-in 0.4s' }}>
          {/* SIDEBAR NAVIGATION */}
          <aside className="sidebar glass-panel">
            <div>
              <div className="roadmap-header">
                <BookOpen size={14} className="text-green-primary" />
                <span className="roadmap-title">{lang === 'en' ? 'Progress Roadmap' : 'Hoja de Ruta'}</span>
              </div>
              <div className="stepper-container">
                {steps.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className={`step-item ${idx === currentStepIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="step-number">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="step-label">{getTxt(step, 'title')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics Modal Trigger */}
            {manualData.diagnostics && (
              <button 
                className="diagnostics-btn"
                onClick={() => {
                  setDiagnosticOpen(true);
                  setActiveSymptom(null);
                }}
              >
                <ShieldAlert size={16} />
                {lang === 'en' ? 'Diagnostics' : 'Diagnósticos'}
              </button>
            )}
          </aside>

          {/* MAIN INSTRUCTION PANE */}
          <main className="display-pane">
            <div className="display-title-section">
              <div className="display-subtitle">
                {selectedModel} • {lang === 'en' ? 'Step' : 'Paso'} {String(currentStepIndex + 1).padStart(2, '0')}
              </div>
              <h2 className="display-title">{getTxt(currentStep, 'title')}</h2>
            </div>

            {/* Dynamic Step Image and Lightbox trigger */}
            {currentStep.image && (
              <div 
                className="step-image-container"
                onClick={() => {
                  let imgPath = '';
                  // Handle dynamic hardware face image depending on model selection
                  if (currentStep.id === 'hardware-identification' && selectedProduct === 'xtreme-pro') {
                    imgPath = selectedModel === 'XA102' 
                      ? '/assets/manuals/xtreme-pro/hw_face_xa.jpg' 
                      : selectedModel === 'XB103' 
                      ? '/assets/manuals/xtreme-pro/hw_face_xb.jpg' 
                      : '/assets/manuals/xtreme-pro/hw_face_xc.jpg';
                  } else if (Array.isArray(currentStep.image)) {
                    imgPath = currentStep.image[activeSubStepIndex] || currentStep.image[0];
                  } else {
                    imgPath = currentStep.image;
                  }
                  setLightboxImage({ src: imgPath, alt: getTxt(currentStep, 'title') });
                }}
              >
                <img 
                  src={getAssetUrl(
                    currentStep.id === 'hardware-identification' && selectedProduct === 'xtreme-pro'
                      ? (selectedModel === 'XA102' 
                          ? '/assets/manuals/xtreme-pro/hw_face_xa.jpg' 
                          : selectedModel === 'XB103' 
                          ? '/assets/manuals/xtreme-pro/hw_face_xb.jpg' 
                          : '/assets/manuals/xtreme-pro/hw_face_xc.jpg')
                      : Array.isArray(currentStep.image)
                      ? (currentStep.image[activeSubStepIndex] || currentStep.image[0])
                      : currentStep.image
                  )} 
                  alt={getTxt(currentStep, 'title')} 
                  className="step-image"
                  onError={(e) => { e.target.src = getAssetUrl('/vite.svg'); }}
                />
                <div className="expand-badge">
                  <Maximize2 size={12} className="text-green-primary" />
                  <span className="expand-text">{lang === 'en' ? 'Expand View' : 'Ampliar Vista'}</span>
                </div>
              </div>
            )}

            {/* Step Copy Content */}
            <p className="step-text">
              {hasSubSteps && activeSubStep 
                ? formatMeasurementText(getTxt(activeSubStep, 'text'))
                : formatMeasurementText(getTxt(currentStep, 'content'))}
            </p>

            {/* CONFIGURATION SELECTION (Mounting Configuration Step) */}
            {currentStep.id === 'mounting-configuration' && (
              <div style={{ marginTop: '2rem', animation: 'fade-in 0.4s' }}>
                <h3 className="checklist-section-title" style={{ marginBottom: '1rem', color: 'var(--green-primary)' }}>
                  {lang === 'en' ? 'CHOOSE YOUR CONFIGURATION' : 'ELIJA SU CONFIGURACIÓN'}
                </h3>
                
                {/* Configuration Options Grid */}
                <div className="tools-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                  {selectedProduct === 'xtreme-pro' ? (
                    <>
                      {/* Standard Open */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'open' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('open');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Standard Open Top-Rail' : 'Riel Superior Abierto'}
                      </button>
                      
                      {/* Round Rail */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'round' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('round');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Round Side Rails' : 'Rieles Redondos'}
                      </button>
                      
                      {/* Advanced Offset */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'advanced' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('advanced');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Advanced Offset Brackets' : 'Montaje Desplazado'}
                      </button>
                      
                      {/* Enclosed Unit */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'enclosed' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('enclosed');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Enclosed Stud Wall' : 'Remolque Cerrado'}
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Open Trailer */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'open' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('open');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Open Trailer Mounting' : 'Montaje de Remolque Abierto'}
                      </button>

                      {/* Enclosed Trailer */}
                      <button 
                        className={`toggle-button ${selectedConfig === 'enclosed' ? 'active' : ''}`}
                        style={{ height: '70px', borderRadius: '4px', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedConfig('enclosed');
                          setCurrentStepIndex(currentStepIndex + 1);
                        }}
                      >
                        {lang === 'en' ? 'Enclosed Trailer / Wall Stud' : 'Montaje Remolque Cerrado / Pared'}
                      </button>
                    </>
                  )}
                </div>

                {selectedConfig && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                    <Info size={14} className="text-green-primary" />
                    <span>
                      {lang === 'en' ? 'Selected Configuration: ' : 'Configuración Seleccionada: '}
                      <strong className="text-white" style={{ textTransform: 'uppercase' }}>{selectedConfig}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* SUB-STEPS TIMELINE (e.g. for ESK100 step) */}
            {hasSubSteps && (
              <div className="collapsible-panel" style={{ marginTop: '1.5rem', border: '1px solid var(--green-border)' }}>
                <div className="panel-header" style={{ borderBottom: '1px solid var(--border-dim)', padding: '1rem' }}>
                  <div className="panel-header-left">
                    <span className="panel-indicator-line" style={{ backgroundColor: 'var(--green-primary)' }}></span>
                    <span className="panel-title" style={{ fontSize: '0.9rem', color: 'var(--green-primary)' }}>
                      {lang === 'en' ? 'Step Sub-Assembly Procedure' : 'Procedimiento de Subensamblaje'}
                    </span>
                  </div>
                </div>
                <div className="panel-content" style={{ padding: '1.25rem' }}>
                  {/* Sub-steps stepper navigation */}
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)', marginBottom: '1.25rem' }}>
                    {subSteps.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveSubStepIndex(sIdx)}
                        className={`toggle-button ${sIdx === activeSubStepIndex ? 'active' : ''}`}
                        style={{ padding: '0.35rem 0.85rem', fontSize: '0.7rem', shrink: 0 }}
                      >
                        {sIdx + 1 < 10 ? `0${sIdx + 1}` : sIdx + 1}
                      </button>
                    ))}
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    {activeSubStep ? t(activeSubStep.title) : ''}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: '1.5' }}>
                    {activeSubStep ? formatMeasurementText(t(activeSubStep.text)) : ''}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 1 SPECIFIC: Collapsible Inventory Checklist */}
            {currentStep.id === 'hardware-identification' && manualData.hardwareKey && (
              <div className="collapsible-panel">
                <button className="panel-header" onClick={() => togglePanel('hardware')}>
                  <div className="panel-header-left">
                    <span className="panel-indicator-line"></span>
                    <span className="panel-title">
                      {lang === 'en' ? 'Hardware Inventory Checklist' : 'Lista de Verificación de Inventario'}
                    </span>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className="text-gray-500" 
                    style={{ transform: expandedPanels.hardware ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} 
                  />
                </button>
                {expandedPanels.hardware && (
                  <div className="panel-content" style={{ animation: 'fade-in 0.3s' }}>
                    
                    {/* Check if manual uses face parts layout (Xtreme Pro series) or standard list */}
                    {manualData.hardwareKey.some(h => h.facePart) ? (
                      <div className="checklist-columns">
                        {/* Left Column (Eyebrows + Nose) */}
                        <div className="checklist-column">
                          {/* Eyebrows */}
                          <div className="checklist-items">
                            <h5 className="checklist-section-title">{lang === 'en' ? 'THE EYEBROWS' : 'LAS CEJAS'}</h5>
                            {manualData.hardwareKey.filter(h => h.facePart === 'Left Eyebrow' || h.facePart === 'Right Eyebrow').map(hw => (
                              <div 
                                key={hw.id}
                                className={`checklist-card ${checkedItems[hw.id] ? 'checked' : ''}`}
                                onClick={() => toggleCheckItem(hw.id)}
                              >
                                <div className="card-left">
                                  <div className="checkbox-box">
                                    {checkedItems[hw.id] && <Check size={12} className="text-black" />}
                                  </div>
                                  <div className="card-texts">
                                    <span className="card-name">{getTxt(hw, 'name')}</span>
                                    <span className="card-specs">{formatMeasurementText(getTxt(hw, 'specs'))}</span>
                                  </div>
                                </div>
                                <span className="card-quantity">x{getDynamicHardwareQty(hw.id, hw.quantity)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Nose */}
                          <div className="checklist-items">
                            <h5 className="checklist-section-title">{lang === 'en' ? 'THE NOSE' : 'LA NARIZ'}</h5>
                            {manualData.hardwareKey.filter(h => h.facePart === 'Nose').map(hw => (
                              <div 
                                key={hw.id}
                                className={`checklist-card ${checkedItems[hw.id] ? 'checked' : ''}`}
                                onClick={() => toggleCheckItem(hw.id)}
                              >
                                <div className="card-left">
                                  <div className="checkbox-box">
                                    {checkedItems[hw.id] && <Check size={12} className="text-black" />}
                                  </div>
                                  <div className="card-texts">
                                    <span className="card-name">{getTxt(hw, 'name')}</span>
                                    <span className="card-specs">{getTxt(hw, 'specs')}</span>
                                  </div>
                                </div>
                                <span className="card-quantity">x{hw.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Column (Eyes + Smile) */}
                        <div className="checklist-column">
                          {/* Eyes */}
                          <div className="checklist-items">
                            <h5 className="checklist-section-title">{lang === 'en' ? 'THE EYES' : 'LOS OJOS'}</h5>
                            {manualData.hardwareKey.filter(h => h.facePart === 'Eyes').map(hw => (
                              <div 
                                key={hw.id}
                                className={`checklist-card ${checkedItems[hw.id] ? 'checked' : ''}`}
                                onClick={() => toggleCheckItem(hw.id)}
                              >
                                <div className="card-left">
                                  <div className="checkbox-box">
                                    {checkedItems[hw.id] && <Check size={12} className="text-black" />}
                                  </div>
                                  <div className="card-texts">
                                    <span className="card-name">{getTxt(hw, 'name')}</span>
                                    <span className="card-specs">{formatMeasurementText(getTxt(hw, 'specs'))}</span>
                                  </div>
                                </div>
                                <span className="card-quantity">x{hw.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {/* Smile */}
                          <div className="checklist-items">
                            <h5 className="checklist-section-title">{lang === 'en' ? 'THE SMILE' : 'LA SONRISA'}</h5>
                            {manualData.hardwareKey.filter(h => h.facePart.includes('Smile')).map(hw => (
                              <div 
                                key={hw.id}
                                className={`checklist-card ${checkedItems[hw.id] ? 'checked' : ''}`}
                                onClick={() => toggleCheckItem(hw.id)}
                              >
                                <div className="card-left">
                                  <div className="checkbox-box">
                                    {checkedItems[hw.id] && <Check size={12} className="text-black" />}
                                  </div>
                                  <div className="card-texts">
                                    <span className="card-name">{getTxt(hw, 'name')}</span>
                                    <span className="card-specs">{formatMeasurementText(getTxt(hw, 'specs'))}</span>
                                  </div>
                                </div>
                                <span className="card-quantity">x{getDynamicHardwareQty(hw.id, hw.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Flat Standard Checklist (BPS100, SPC21, WC001) */
                      <div className="checklist-items" style={{ width: '100%' }}>
                        <div className="tools-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                          {manualData.hardwareKey.map(hw => (
                            <div 
                              key={hw.id}
                              className={`checklist-card ${checkedItems[hw.id] ? 'checked' : ''}`}
                              onClick={() => toggleCheckItem(hw.id)}
                              style={{ width: '100%', boxSizing: 'border-box' }}
                            >
                              <div className="card-left">
                                <div className="checkbox-box">
                                  {checkedItems[hw.id] && <Check size={12} className="text-black" />}
                                </div>
                                <div className="card-texts">
                                  <span className="card-name">{getTxt(hw, 'name')}</span>
                                  <span className="card-specs">{formatMeasurementText(getTxt(hw, 'specs'))}</span>
                                </div>
                              </div>
                              <span className="card-quantity">x{hw.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 1 SPECIFIC: Collapsible Tools Required list */}
            {currentStep.id === 'hardware-identification' && manualData.toolsRequired && (
              <div className="collapsible-panel">
                <button className="panel-header" onClick={() => togglePanel('tools')}>
                  <div className="panel-header-left">
                    <span className="panel-indicator-line"></span>
                    <span className="panel-title">
                      {lang === 'en' ? 'Tools Required' : 'Herramientas Requeridas'}
                    </span>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className="text-gray-500" 
                    style={{ transform: expandedPanels.tools ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} 
                  />
                </button>
                {expandedPanels.tools && (
                  <div className="panel-content" style={{ animation: 'fade-in 0.3s' }}>
                    <div className="tools-grid">
                      {manualData.toolsRequired.map((tool, idx) => (
                        <div key={idx} className="tool-card">
                          <div className="tool-icon-box">
                            <Wrench size={14} className="text-green-primary" />
                          </div>
                          <span className="tool-label">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DYNAMIC ALERT BOXES (WARNINGS AND TIPS) */}
            {(currentStep.warnings || currentStep.tips || currentStep.translation?.es?.warnings || currentStep.translation?.es?.tips) && (
              <div className={`alert-container ${getArray(currentStep, 'warnings').length > 0 && getArray(currentStep, 'tips').length > 0 ? 'dual' : ''}`}>
                {/* Warnings Card */}
                {getArray(currentStep, 'warnings').length > 0 && (
                  <div className="alert-box warning">
                    <div className="alert-watermark">
                      <ShieldAlert size={64} className="text-red-primary" />
                    </div>
                    <div className="alert-title-row">
                      <span className="alert-pulse"></span>
                      <h4 className="alert-title">{lang === 'en' ? 'Critical Constraints' : 'Restricciones Críticas'}</h4>
                    </div>
                    <div className="alert-list">
                      {getArray(currentStep, 'warnings').map((warn, wIdx) => (
                        <div key={wIdx} className="alert-item">
                          <span className="alert-bullet">—</span>
                          <p className="alert-text">{t(warn)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips Card */}
                {getArray(currentStep, 'tips').length > 0 && (
                  <div className="alert-box tip">
                    <div className="alert-watermark">
                      <Check size={64} className="text-green-primary" />
                    </div>
                    <div className="alert-title-row">
                      <span className="alert-pulse"></span>
                      <h4 className="alert-title">{lang === 'en' ? 'Efficiency & Alignment' : 'Eficiencia y Alineación'}</h4>
                    </div>
                    <div className="alert-list">
                      {getArray(currentStep, 'tips').map((tip, tIdx) => (
                        <div key={tIdx} className="alert-item">
                          <Check size={14} className="text-green-primary" style={{ marginTop: '3px', flexShrink: '0' }} />
                          <p className="alert-text">{formatMeasurementText(t(tip))}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOTTOM NAV BAR */}
            <div className="control-bar">
              <button 
                className="nav-link"
                disabled={currentStepIndex === 0 && activeSubStepIndex === 0}
                onClick={handlePrevious}
              >
                {lang === 'en' ? '← Previous' : '← Anterior'}
              </button>

              <div className="step-indicator">
                {String(currentStepIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </div>

              {currentStepIndex < steps.length - 1 || (hasSubSteps && activeSubStepIndex < subSteps.length - 1) ? (
                <button 
                  className="advance-btn"
                  onClick={handleAdvance}
                  disabled={currentStep.id === 'mounting-configuration' && !selectedConfig}
                >
                  {lang === 'en' ? 'Commit & Advance →' : 'Confirmar y Avanzar →'}
                </button>
              ) : (
                <button 
                  className="advance-btn"
                  onClick={resetToMainMenu}
                >
                  {lang === 'en' ? 'Finish & Back to Menu' : 'Finalizar y Volver'}
                </button>
              )}
            </div>
          </main>
        </div>
      )}

      {/* DIAGNOSTICS OVERLAY MODAL */}
      {diagnosticOpen && manualData && manualData.diagnostics && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={() => setDiagnosticOpen(false)}>
              <X size={16} />
            </button>
            
            <div className="diagnostic-content">
              <div className="diagnostic-header">
                <span className="diagnostic-subtitle">
                  {lang === 'en' ? 'Professional Troubleshooting Flow' : 'Flujo de Resolución de Problemas'}
                </span>
                <h3 className="diagnostic-title">{getTxt(manualData.diagnostics, 'title')}</h3>
              </div>

              {/* Symptom list grid */}
              <div className="symptoms-grid">
                {getArray(manualData.diagnostics, 'symptoms').map((symptom) => (
                  <div 
                    key={symptom.id} 
                    className="symptom-card"
                    onClick={() => setActiveSymptom(activeSymptom === symptom.id ? null : symptom.id)}
                  >
                    <h4 className="symptom-title" style={{ color: activeSymptom === symptom.id ? 'var(--green-primary)' : 'white' }}>
                      {getTxt(symptom, 'title')}
                    </h4>
                    <p className="symptom-desc">{getTxt(symptom, 'description')}</p>
                    
                    {/* Render active symptom's solution box */}
                    {activeSymptom === symptom.id && (
                      <div 
                        className="bg-black/60 p-4 border border-green-primary/30 mt-4 rounded-sm text-sm"
                        style={{ animation: 'fade-in 0.3s' }}
                      >
                        <strong className="text-green-primary block mb-1">
                          {lang === 'en' ? 'RECOMMENDED RESOLUTION:' : 'RESOLUCIÓN RECOMENDADA:'}
                        </strong>
                        <span className="text-gray-300 leading-relaxed block">{getTxt(symptom, 'solution')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Troubleshooting Videos Library */}
              {manualData.videos && manualData.videos.length > 0 && (
                <div className="tech-videos-section">
                  <h5 className="tech-videos-title">{lang === 'en' ? 'Technical Video Library' : 'Biblioteca de Videos Técnicos'}</h5>
                  <div className="tech-videos-list">
                    {manualData.videos.map((vid, vIdx) => {
                      const videoId = vid.url.includes('v=') ? vid.url.split('v=')[1] : vid.url.split('/').pop();
                      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                      return (
                        <div 
                          key={vIdx} 
                          className="video-item"
                          onClick={() => setActiveVideo({ url: embedUrl, title: getTxt(vid, 'title') })}
                        >
                          <div className="video-play-box">
                            <Play size={12} className="text-red-primary video-play-icon" style={{ marginLeft: '1px' }} />
                          </div>
                          <div className="video-info">
                            <span className="video-title">{getTxt(vid, 'title')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER LIGHTBOX */}
      {activeVideo && (
        <div className="modal-overlay" style={{ zIndex: 110 }}>
          <div className="modal-container" style={{ maxWidth: '800px', aspectRatio: '16/9' }}>
            <button className="modal-close" onClick={() => setActiveVideo(null)}>
              <X size={16} />
            </button>
            <iframe 
              src={activeVideo.url} 
              title={activeVideo.title}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* IMAGE EXPAND LIGHTBOX */}
      {lightboxImage && (
        <div className="modal-overlay" style={{ zIndex: 110 }} onClick={() => setLightboxImage(null)}>
          <button className="modal-close" onClick={() => setLightboxImage(null)}>
            <X size={16} />
          </button>
          <img 
            src={getAssetUrl(lightboxImage.src)} 
            alt={lightboxImage.alt} 
            className="lightbox-img" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
