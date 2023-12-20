# DietIn Machine Learning

The Part of Product Based Bangkit Capstone Project Team CH2-PS549


## Machine Learning Members

| Name | Bangkit ID | Github|
|---|---|---| 
| Shierra Intan Anggari | M128BSX1189 | [shierraanggari](https://github.com/shierraanggari) |
| Muhammad Riziq Ramadhan | M128BSY1615 | [Soocotra](https://github.com/Soocotra) |
| Fadlan Ahya Imani | M011BSY1869 | [FadlanAhya](github.com/fadlan-ahya) |

## Project Overview
We present an Indonesian dishes image classification system developed using TensorFlow that classifies and recognizes 16 different classes of images. In the initial phase, we employed three distinct Transfer Learning Architectures—InceptionV3, Nasnetmobile, and DenseNet121. Our primary objective was to implement Transfer Learning and fine-tuning strategies suitable for our relatively small dataset.

The dataset comprises 11027 images distributed across 16 classes, including:
- Ayam Bakar
- Bakso
- Bebek Goreng
- Burger
- Gado-Gado
- Gudeg
- Ikan Bakar
- Martabak Manis
- Martabak Telor
- nasi goreng
- Omelette
- Pempek
- Rendang
- Sate
- Sayur Asem
- Semur Jengkol

They are collected from different sources:
- [Indonesian Food](https://www.kaggle.com/datasets/rizkashintaw/indonesian-food)
- [INDONESIAN FOOD](https://www.kaggle.com/datasets/theresalusiana/indonesian-food)
- [makanan-ibu-food-detection](https://www.kaggle.com/datasets/aveivein/makanan-ibu-food-detection)
- [Indonesian Food | Kaggle ](https://www.kaggle.com/datasets/rizkashintaw/indonesian-food)
- [Indonesian Food Image](https://data.mendeley.com/datasets/vtjd68bmwt/1)
- [food-image-classification-dataset](https://www.kaggle.com/datasets/harishkumardatalab/food-image-classification-dataset)
- Scraping on google
## Data Preprocessing

To enhance the robustness of our models, we employed the following data preprocessing techniques: [**ImageDataGenerator**](https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/image/ImageDataGenerator). We utilized this powerful tool for:
- Splitting the dataset into training, validation, and test sets (80%, 10%, and 10% respectively).
- Augmenting images to increase dataset diversity and improve generalization.
- Normalizing the dataset for consistent and effective training.

For time efficiency and code optimization, we created an IndonesianFoodDataset class in the data_preprocessing.py file. Here is an example of basic usage:

```
data = IndonesianFoodDataset(dataset_path='/content/drive/MyDrive/indonesian_foods', split_size=(0.8, 0.1, 0.1))
train_set, val_set, test_set = data.load_data(target_size=(224,224))
```
This class will extracts the dataset, copies it to the /dataset/temp_set folder, and renames the files appropriately. The load_data() function then divides the data into training (80%), validation (10%), and test (10%) sets based on the specified split size.

The method also supports optional parameters for image augmentation, including:

| Args |  | 
|---|---|
| batch_size | int, default=32 
| target_size | tuple, default=(150, 150) 
| rotation_range | int, default=0 
| width_shift_range | float, default=0.0 
| height_shift_range | float, default=0.0 
| shear_range | float, default=0.0 
| zoom_range | float, default=0.0 
| brightness_range | list of float, default=None 
| horizontal_flip | boolean, default=False 
| vertical_flip | boolean, default=False |

| Returns |
|---|
| `load_data()` will return a tuple (train_set, val_set, test_set) containing dataset and its label that has been splitted into three parts

## Transfer Learning and Fine-Tuning

#### Model Architecture Selection
- [NasNetMobile](https://keras.io/api/applications/nasnet/#nasnetmobile-function)
- [InceptionV3](https://keras.io/api/applications/inceptionv3/)
- [DenseNet121](https://keras.io/api/applications/densenet/)

After training each model with our dataset, it became evident that InceptionV3 outperformed the other two Architectures in terms of classification accuracy with 95% trained accuracy and 93.5% validation accuracy. Fine-tuning was a critical step in adapting these models to our specific dataset. We conducted fine-tuning by adjusting the artificial neural network (ANN) layers to ensure that the Architecture align with our small dataset. This process allowed us to tailor the models for optimal performance on our specific image classification task.

![image](https://github.com/mafif21/dietin-app/assets/92849740/e0854d1a-0b59-4648-9e32-f06095fc6c83)

## Model Performance Evaluation
The evaluation of the model reached an impressive 93% accuracy on unseen data during both training and validation phases, showcasing its effectiveness in generalizing to new samples.

## Model Deployment

The trained model is deployed using TensorFlow Lite (tflite), ensuring efficient and lightweight deployment on the mobile app we developed.
