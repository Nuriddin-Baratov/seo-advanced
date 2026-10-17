// app/page.js
"use client";

import { useQuery, useMutation } from "convex/react";
import { useState, useRef } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const products = useQuery(api.products.get);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.create);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) return;

    setIsUploading(true);
    try {
      let imageId = null;

      // Agar rasm tanlangan bo'lsa, uni Convex Storage'ga yuklaymiz
      if (selectedImage) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }

      // Mahsulotni bazaga saqlaymiz
      await addProduct({
        title,
        price: Number(price),
        description,
        imageId,
      });

      // Formani tozalash
      setTitle("");
      setPrice("");
      setDescription("");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Mahsulot qo'shish formasi */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>➕ Yangi mahsulot qo'shish</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mahsulot nomi"
              style={styles.input}
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Narxi ($ yoki so'mda)"
              style={styles.input}
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mahsulot haqida qisqacha tavsif..."
              style={styles.textarea}
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setSelectedImage(e.target.files[0])}
              style={styles.fileInput}
            />
            <button
              type="submit"
              disabled={isUploading}
              style={isUploading ? styles.buttonDisabled : styles.button}
            >
              {isUploading ? "Yuklanmoqda..." : "Mahsulotni saqlash"}
            </button>
          </form>
        </div>

        {/* Mahsulotlar kartochkalari ro'yxati (Grid) */}
        <h2 style={styles.sectionTitle}>🛍️ Mahsulotlar katalogi</h2>
        
        {products === undefined ? (
          <p style={styles.statusText}>Yuklanmoqda...</p>
        ) : products.length === 0 ? (
          <p style={styles.statusText}>Hali hech qanday mahsulot qo'shilmagan.</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product._id} style={styles.productCard}>
                <div style={styles.imageWrapper}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={styles.noImage}>Rasm yo'q</div>
                  )}
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.productTitle}>{product.title}</h3>
                    <span style={styles.productPrice}>${product.price}</span>
                  </div>
                  <p style={styles.productDesc}>{product.description}</p>
                  <button style={styles.buyButton}>Sotib olish</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// Visual dizayn uslublari (CSS-in-JS)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px 20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    marginBottom: "40px",
    border: "1px solid #e2e8f0",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
  },
  fileInput: {
    fontSize: "14px",
    color: "#64748b",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "not-allowed",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  noImage: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  cardBody: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  productTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  productPrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#16a34a",
  },
  productDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.4",
    marginBottom: "16px",
    flexGrow: 1,
  },
  buyButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  statusText: {
    color: "#64748b",
    fontSize: "15px",
  },
};