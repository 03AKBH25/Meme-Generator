import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { 
  Download, 
  Upload, 
  Type, 
  Crop, 
  Trash2, 
  Plus, 
  Grid,
  Layers,
  Sparkles,
  RefreshCcw,
  Check,
  X
} from 'lucide-react';

const Sidebar = ({ onSelectMeme }) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch('./memes.json')
      .then(res => res.json())
      .then(data => setMemes(data))
      .catch(err => console.error("Error loading memes:", err));
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title-group">
          <img src="./shiba-logo.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <h2 className="sidebar-title">Templates</h2>
        </div>
        <p className="sidebar-subtitle">Quick Memes</p>
      </div>
      <div className="meme-grid custom-scrollbar">
        {memes.map((meme, idx) => (
          <div 
            key={idx} 
            className="meme-item"
            onClick={() => onSelectMeme(`./memes/${meme}`)}
          >
            <img src={`./memes/${meme}`} alt={meme} />
            <div className="meme-overlay">
              <Plus size={24} color="white" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

const Toolbar = ({ canvas, onUpload, onDownload, onCrop, onAddFilter, onReset, isCropping, onConfirmCrop, onCancelCrop }) => {
  const addText = (preset = 'TOP TEXT') => {
    if (!canvas) {
      console.warn("Canvas not ready");
      return;
    }
    const text = new fabric.IText(preset, {
      left: 250,
      top: preset === 'TOP TEXT' ? 80 : 420,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontSize: 50,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      cornerColor: '#3b82f6',
      cornerSize: 12,
      padding: 10,
      transparentCorners: false
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.bringToFront(text);
    canvas.requestRenderAll();
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) {
      alert("Please select an item (text or image) to remove it.");
      return;
    }
    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  return (
    <div className="toolbar-content custom-scrollbar" style={{ overflowY: 'auto' }}>
      {isCropping ? (
        <div className="tools-group animate-fade-in" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <p className="tools-label" style={{ color: '#3b82f6' }}>Cropping Mode</p>
          <p style={{ fontSize: '11px', marginBottom: '1rem', color: '#a1a1aa' }}>Adjust the box on the image to crop.</p>
          <div className="action-grid">
            <button className="btn-tool btn-primary" onClick={onConfirmCrop}>
              <Check size={16} />
              <span>Apply</span>
            </button>
            <button className="btn-tool" onClick={onCancelCrop} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="action-grid">
            <button className="btn-large" onClick={onUpload}>
              <Upload size={18} color="#3b82f6" />
              <span>Upload Image</span>
            </button>
            <button className="btn-large btn-primary" onClick={onDownload}>
              <Download size={18} />
              <span>Download Meme</span>
            </button>
          </div>

          <div className="tools-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="tools-label">Meme Tools</p>
              <button onClick={onReset} title="Reset All" style={{ background: 'transparent', color: '#a1a1aa', border: 'none', cursor: 'pointer' }}>
                <RefreshCcw size={14} />
              </button>
            </div>
            <div className="action-grid">
              <button className="btn-tool" onClick={() => addText('TOP TEXT')}>
                <Type size={16} />
                <span>Add Top Text</span>
              </button>
              <button className="btn-tool" onClick={() => addText('BOTTOM TEXT')}>
                <Type size={16} />
                <span>Add Bottom Text</span>
              </button>
              <button className="btn-tool" onClick={onCrop}>
                <Crop size={16} />
                <span>Crop Image</span>
              </button>
              <button className="btn-tool" onClick={() => canvas && canvas.discardActiveObject().requestRenderAll()}>
                <Layers size={16} />
                <span>Deselect</span>
              </button>
            </div>
          </div>

          <div className="tools-group">
            <p className="tools-label">Modern Filters</p>
            <div className="action-grid">
              <button className="btn-tool" onClick={() => onAddFilter('Grayscale')}>
                <Sparkles size={16} />
                <span>B&W</span>
              </button>
              <button className="btn-tool" onClick={() => onAddFilter('Sepia')}>
                <Layers size={16} />
                <span>Vintage</span>
              </button>
              <button className="btn-tool" onClick={() => onAddFilter('Invert')}>
                <Sparkles size={16} />
                <span>Invert</span>
              </button>
              <button className="btn-tool" onClick={() => onAddFilter('Clear')}>
                <Trash2 size={16} />
                <span>Reset Layers</span>
              </button>
            </div>
          </div>

          <button className="btn-tool btn-destructive" onClick={deleteSelected} style={{ marginTop: '0.5rem' }}>
            <Trash2 size={16} />
            <span>Remove Selected Item</span>
          </button>
          <p style={{ fontSize: '10px', color: '#71717a', textAlign: 'center', marginTop: '0.5rem' }}>
            Use this to delete the selected text or image.
          </p>
        </>
      )}
      
      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', fontSize: '10px', color: '#52525b', textAlign: 'center' }}>
        Double-click text to edit. <br/> <b>DEL</b> key to remove.
      </div>
    </div>
  );
};

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const fileInputRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);
  
  const [phrases] = useState([
    "Meme bana sabko hasa", 
    "Masti Factory", 
    "Dimag ka dahi memes", 
    "Hasna mana hai"
  ]);
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);

  // Cropping state
  const [isCropping, setIsCropping] = useState(false);
  const [cropRect, setCropRect] = useState(null);
  const [croppingImage, setCroppingImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#111111',
      preserveObjectStacking: true,
    });

    fabricCanvas.current = canvas;
    setCanvasInstance(canvas);

    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObjects = canvas.getActiveObjects();
        const isEditing = activeObjects.some(obj => obj.isEditing);
        if (!isEditing && activeObjects.length > 0) {
          canvas.remove(...activeObjects);
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.dispose();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addImageToCanvas = (url) => {
    fabric.Image.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
      const canvas = fabricCanvas.current;
      const scale = Math.min(
        (canvas.width * 0.9) / img.width,
        (canvas.height * 0.9) / img.height
      );
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        cornerColor: '#3b82f6',
        cornerSize: 12,
        transparentCorners: false,
      });
      
      canvas.add(img);
      canvas.sendObjectToBack(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => addImageToCanvas(f.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    canvas.discardActiveObject();
    canvas.renderAll();

    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        multiplier: 2,
        enableRetinaScaling: true
      });

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `meme-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Try uploading image locally.");
    }
  };

  const handleAddFilter = (type) => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      if (type === 'Clear') {
        activeObject.filters = [];
      } else if (type === 'Grayscale') {
        activeObject.filters = [new fabric.filters.Grayscale()];
      } else if (type === 'Sepia') {
        activeObject.filters = [new fabric.filters.Sepia()];
      } else if (type === 'Invert') {
        activeObject.filters = [new fabric.filters.Invert()];
      }
      activeObject.applyFilters();
      canvas.requestRenderAll();
    } else {
      alert("Please select an image layer first.");
    }
  };

  // --- Real Cropping Logic ---
  const startCrop = () => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') {
      alert("Please select an image to crop.");
      return;
    }

    setIsCropping(true);
    setCroppingImage(activeObject);

    // Create selection rectangle
    const rect = new fabric.Rect({
      left: activeObject.left - (activeObject.width * activeObject.scaleX / 2),
      top: activeObject.top - (activeObject.height * activeObject.scaleY / 2),
      width: activeObject.width * activeObject.scaleX,
      height: activeObject.height * activeObject.scaleY,
      fill: 'rgba(59, 130, 246, 0.3)',
      stroke: '#3b82f6',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      cornerColor: '#3b82f6',
      cornerSize: 10,
      transparentCorners: false,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    setCropRect(rect);
    canvas.requestRenderAll();
  };

  const confirmCrop = () => {
    const canvas = fabricCanvas.current;
    if (!cropRect || !croppingImage) return;

    const img = croppingImage;
    const rect = cropRect;

    // Calculate crop coordinates relative to image
    const scaleX = img.scaleX;
    const scaleY = img.scaleY;

    const left = (rect.left - (img.left - (img.width * scaleX / 2))) / scaleX;
    const top = (rect.top - (img.top - (img.height * scaleY / 2))) / scaleY;
    const width = rect.width * rect.scaleX / scaleX;
    const height = rect.height * rect.scaleY / scaleY;

    // Use clipPath in Fabric 6
    img.set({
      clipPath: new fabric.Rect({
        left: left - img.width / 2,
        top: top - img.height / 2,
        width: width,
        height: height,
        absolutePositioned: false,
      })
    });

    canvas.remove(rect);
    setIsCropping(false);
    setCropRect(null);
    setCroppingImage(null);
    canvas.requestRenderAll();
  };

  const cancelCrop = () => {
    const canvas = fabricCanvas.current;
    if (cropRect) canvas.remove(cropRect);
    setIsCropping(false);
    setCropRect(null);
    setCroppingImage(null);
    canvas.requestRenderAll();
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the entire canvas?")) {
      fabricCanvas.current.clear();
      fabricCanvas.current.setBackgroundColor('#111111', fabricCanvas.current.renderAll.bind(fabricCanvas.current));
    }
  };

  return (
    <div className="app-container">
      <Sidebar onSelectMeme={addImageToCanvas} />
      
      <main className="main-content">
        <header className="header">
          <div className="logo-group">
            <div className="logo-box" style={{ background: 'transparent', boxShadow: 'none' }}>
               <img src="./shiba-logo.png" alt="Shiba Logo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </div>
            <h1 className="logo-text animate-phrase" key={currentPhraseIdx}>
              {phrases[currentPhraseIdx]}
            </h1>
          </div>
          <div style={{ fontSize: '10px', color: '#71717a', fontWeight: 600, letterSpacing: '2px', display: 'flex', gap: '20px' }}>
            <span>DESI MEME ENGINE 🔥</span>
            <span>v2.0 UPDATED</span>
          </div>
        </header>

        <div className="editor-area">
          <div className="canvas-wrapper">
            <div className="canvas-container">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <aside className="tools-sidebar">
            <div className="tools-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles size={18} color="#3b82f6" fill="#3b82f633" />
                <h2 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Meme ka Karkhana</h2>
              </div>
            </div>
            
            <Toolbar 
              canvas={canvasInstance} 
              onUpload={() => fileInputRef.current.click()} 
              onDownload={handleDownload}
              onCrop={startCrop}
              onAddFilter={handleAddFilter}
              onReset={handleReset}
              isCropping={isCropping}
              onConfirmCrop={confirmCrop}
              onCancelCrop={cancelCrop}
            />
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleUpload}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
