# DietIn Machine Learning

The Part of Product Based Bangkit Capstone Project Team CH2-PS549


## Machine Learning Members


| Name | Bangkit ID | Github|
| ------ | ------ | | ------ | 
| Shierra Intan Anggari | M128BSX1189 | [shierraanggari](https://github.com/shierraanggari) |
| Muhammad Riziq Ramadhan | M128BSY1615 | [Soocotra](https://github.com/Soocotra) |
| Fadlan Ahya Imani | M011BSY1869 | ? |

### What we worked about?
We present an Indonesian foods image classification system developed using TensorFlow that classifies and recognizes 16 different classes of images. In the initial phase, we employed three distinct Transfer Learning Model Architectures—InceptionV3, Nasnetmobile, and DenseNet121. Our primary objective was to implement Transfer Learning and fine-tuning strategies suitable for our relatively small dataset.
### Fine-Tuning Process

#### Model Architecture Selection
- [NasNetMobile](https://keras.io/api/applications/nasnet/#nasnetmobile-function)
- [InceptionV3](https://keras.io/api/applications/inceptionv3/)
- [DenseNet121](https://keras.io/api/applications/densenet/)

After training each model with our dataset, it became evident that InceptionV3 outperformed the other two Architectures in terms of classification accuracy with 95% trained accuracy and 93.5% validation accuracy. Fine-tuning was a critical step in adapting these models to our specific dataset. We conducted fine-tuning by adjusting the artificial neural network (ANN) layers to ensure that the Architecture align with our small dataset. This process allowed us to tailor the models for optimal performance on our specific image classification task.

![image](https://github.com/mafif21/dietin-app/assets/92849740/e0854d1a-0b59-4648-9e32-f06095fc6c83)

### Data Preprocessing

To enhance the robustness of our models, we employed the following data preprocessing techniques: [**ImageDataGenerator**](https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/image/ImageDataGenerator). We utilized this powerful tool for:
- Splitting the dataset into training, validation, and test sets.
- Augmenting images to increase dataset diversity and improve generalization.
- Normalizing the dataset for consistent and effective training.
### Model Deployment

Our trained model is deployed using TensorFlow Lite (tflite), ensuring efficient and lightweight deployment on Mobile App that we worked on.
