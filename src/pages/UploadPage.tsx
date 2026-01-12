import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import Navigation from "../components/Navigation";
import BoneModel3D from "../components/BoneModel3D";
import {
  Upload,
  FileImage,
  AlertCircle,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, []);

  // Cleanup preview URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".bmp", ".tiff", ".dicom"],
    },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis time
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      // Navigate to results with file data
      setTimeout(() => {
        navigate("/results", {
          state: {
            fileName: uploadedFile.name,
            fileSize: uploadedFile.size,
            uploadTime: new Date().toISOString(),
            imagePreview: imagePreview,
          },
        });
      }, 1000);
    }, 3000);
  };

  const removeFile = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setUploadedFile(null);
    setImagePreview(null);
    setProgress(0);
    setIsAnalyzing(false);
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleResetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleSampleImageClick = (imagePath: string, altText: string) => {
    // Create a mock file for the sample image
    const mockFile = new File([""], altText + ".jpg", {
      type: "image/jpeg",
    });
    setUploadedFile(mockFile);
    setImagePreview(imagePath);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {" "}
          {/* Increased max-width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Upload X-Ray Image
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Upload your X-ray image for AI-powered fracture detection. Our
              system supports JPEG, PNG, BMP, TIFF, and DICOM formats.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="w-6 h-6 mr-2 text-blue-500" />
                    Upload X-Ray Image
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Drag and drop your X-ray image or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!uploadedFile ? (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors min-h-[200px] flex items-center justify-center ${
                        isDragActive
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div>
                        <FileImage className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        {isDragActive ? (
                          <p className="text-blue-400 text-lg">
                            Drop the X-ray image here...
                          </p>
                        ) : (
                          <div>
                            <p className="text-slate-300 text-lg mb-2">
                              Drag & drop your X-ray image here
                            </p>
                            <p className="text-slate-400">
                              or click to browse files
                            </p>
                            <p className="text-sm text-slate-500 mt-4">
                              Supports: JPEG, PNG, BMP, TIFF, DICOM
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileImage className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="text-white font-medium">
                              {uploadedFile.name}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        {!isAnalyzing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <AnimatePresence>
                        {isAnalyzing && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center space-x-2 text-blue-400">
                              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                              <span>Analyzing X-ray image...</span>
                            </div>
                            <Progress value={progress} className="w-full" />
                            <p className="text-sm text-slate-400">
                              AI is processing your image and detecting
                              potential fractures
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isAnalyzing && (
                        <Button
                          onClick={handleAnalyze}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                        >
                          <AlertCircle className="w-5 h-5 mr-2" />
                          Analyze for Fractures
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sample Images */}
              <Card className="bg-slate-800/50 border-slate-600 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    Sample X-Ray Images
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Try our system with these sample images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <img
                        src="/assets/xray-sample-normal.jpg"
                        alt="Normal X-ray"
                        className="w-full h-24 object-cover rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() =>
                          handleSampleImageClick(
                            "/assets/xray-sample-normal.jpg",
                            "Normal X-ray"
                          )
                        }
                      />
                      <p className="text-sm text-slate-400">Normal Bone</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="/assets/ClavicleFracture.jpg"
                        alt="Clavicle Fracture"
                        className="w-full h-24 object-cover rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() =>
                          handleSampleImageClick(
                            "/assets/ClavicleFracture.jpg",
                            "Clavicle Fracture"
                          )
                        }
                      />
                      <p className="text-sm text-slate-400">
                        Clavicle Fracture
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Image Preview / 3D Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-[500px] lg:h-full" // Fixed height
            >
              <Card className="bg-slate-800/30 border-slate-600 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>
                      {imagePreview ? "X-Ray Preview" : "3D Skeleton Model"}
                    </span>
                    {imagePreview && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleZoomOut}
                          className="text-slate-400 hover:text-white"
                          disabled={zoom <= 0.5}
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleZoomIn}
                          className="text-slate-400 hover:text-white"
                          disabled={zoom >= 3}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRotate}
                          className="text-slate-400 hover:text-white"
                        >
                          <RotateCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleResetView}
                          className="text-slate-400 hover:text-white"
                        >
                          Reset
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {imagePreview
                      ? "View and examine your uploaded X-ray image"
                      : "Interactive 3D reference model"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-2 relative overflow-hidden">
                  {imagePreview ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Uploaded X-ray"
                        className="max-w-full max-h-full object-contain transition-transform duration-200"
                        style={{
                          transform: `scale(${zoom}) rotate(${rotation}deg)`,
                        }}
                      />
                      {/* Zoom level indicator */}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {Math.round(zoom * 100)}%
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <BoneModel3D
                        interactive={true}
                        autoRotate={!isAnalyzing}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
