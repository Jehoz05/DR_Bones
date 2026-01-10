import { useState, useCallback } from "react";
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
import { Upload, FileImage, AlertCircle } from "lucide-react";

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
    }
  }, []);

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
          },
        });
      }, 1000);
    }, 3000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setProgress(0);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
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
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      <input {...getInputProps()} />
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
                            Remove
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
                        onClick={() => {
                          // Create a mock file for demo
                          const mockFile = new File([""], "/images/Xray.jpg", {
                            type: "image/jpeg",
                          });
                          setUploadedFile(mockFile);
                        }}
                      />
                      <p className="text-sm text-slate-400">Normal Bone</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-full h-24 bg-slate-700 rounded-lg mb-2 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors"
                        onClick={() => {
                          const mockFile = new File(
                            [""],
                            "/images/ClavicleFracture.jpg",
                            { type: "image/jpeg" }
                          );
                          setUploadedFile(mockFile);
                        }}
                      >
                        <FileImage className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-400">
                        Clavicle Fracture
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3D Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-96 lg:h-full"
            >
              <Card className="bg-slate-800/30 border-slate-600 h-full">
                <CardContent className="p-6 h-full">
                  <BoneModel3D interactive={true} autoRotate={!isAnalyzing} />
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
