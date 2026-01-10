import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Navigation from "../components/Navigation";
import SimpleBoneModel from "../components/SimpleBoneModel";
import { Upload, Brain, FileText, Shield } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload X-Ray Images",
      description: "Drag and drop or select X-ray images for instant analysis",
    },
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced AI algorithms detect 24+ types of bone fractures",
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description:
        "Get comprehensive medical reports with treatment recommendations",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your medical data is encrypted and kept completely private",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className=" pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className=" text-center text-5xl lg:text-6xl font-bold text-white mb-6">
                AI-Powered
                <span className="text-blue-500 block">Bone Fracture</span>
                Detection
              </h1>
              <p className=" text-center text-xl text-slate-300 mb-8 leading-relaxed">
                Upload X-ray images and get instant, accurate fracture detection
                with AI-powered analysis. Get detailed medical recommendations
                from our intelligent assistant, Mr. Bony.
              </p>
              <div className="  flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/upload">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Start Analysis
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-96 lg:h-[500px]"
            >
              <SimpleBoneModel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Medical AI Technology
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our cutting-edge AI system can detect and analyze 24 different
              types of bone fractures with high accuracy and provide detailed
              medical insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-colors">
                    <CardHeader>
                      <Icon className="w-12 h-12 text-blue-500 mb-4" />
                      <CardTitle className="text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl font-bold text-blue-500 mb-2">24+</h3>
              <p className="text-xl text-slate-300">Fracture Types Detected</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-blue-500 mb-2">95%+</h3>
              <p className="text-xl text-slate-300">Detection Accuracy</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-blue-500 mb-2">&lt;30s</h3>
              <p className="text-xl text-slate-300">Analysis Time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-linear-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Analyze Your X-Ray?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Upload your X-ray image now and get instant AI-powered fracture
              detection with detailed medical recommendations.
            </p>
            <Link to="/upload">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload X-Ray Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
