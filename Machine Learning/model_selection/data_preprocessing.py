import os
import shutil
import random
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from keras.api._v2.keras.preprocessing import image
import splitfolders

class IndonesianFoodDataset:
  def __init__(self, dataset_path, split_size=(0.7, 0.2, 0.1)):
    self.create_dir('../dataset/')
    self.DATASET_BASE = '../dataset/tmp_set'
    self.DATASET_PATH = dataset_path
    self.TRAIN_PATH = os.path.join(self.DATASET_BASE, 'train')
    self.VAL_PATH = os.path.join(self.DATASET_BASE, 'val')
    self.TEST_PATH = os.path.join(self.DATASET_BASE, 'test')
    self.TMP_PATH = '../dataset/tmp'
    self.SPLIT_SIZE = split_size

    self.category_list = os.listdir(self.DATASET_PATH)
    self.category_list.sort()
    self.extract_dataset()
    # self.split_data()

  def create_dir(self, path) -> str:
    try:
      os.mkdir(path=path)

    except FileExistsError:
      print('Directory exists: {}'.format(path))

    return path

  def extract_dataset(self):
    self.create_dir(self.TMP_PATH)
    for cat in self.category_list:
      folder_path = os.path.join(self.DATASET_PATH, cat)
      files = os.listdir(folder_path)
      files.sort()
      print("{}: {}".format(cat, len(files)))
      temp_cat = os.path.join(self.TMP_PATH, cat)
      self.create_dir(temp_cat)

      for i, file in enumerate(files):
        src_path = os.path.join(folder_path, file)
        dest_path = os.path.join(temp_cat, file)
        try:
          shutil.copyfile(src_path, dest_path)
        except Exception as e:
          print(e)

  def load_data(self, batch_size=32,
              target_size=(150, 150),
              rotation_range = 0,
              width_shift_range = 0.0,
              height_shift_range = 0.0,
              shear_range = 0.0,
              zoom_range = 0.0,
              brightness_range=None,
              horizontal_flip = False,
              vertical_flip = False):

    split = splitfolders.ratio(self.TMP_PATH, output="../dataset/tmp_set", seed=1337, ratio=self.SPLIT_SIZE)

    def add_noise(img):
        VARIABILITY = 15
        deviation = VARIABILITY*random.random()
        noise = np.random.normal(0, deviation, img.shape)
        img += noise
        np.clip(img, 0., 255.)
        return img

    train_gen = image.ImageDataGenerator(
        rescale=1/255.,
        rotation_range=rotation_range,
        width_shift_range=width_shift_range,
        height_shift_range=height_shift_range,
        brightness_range=brightness_range,
        shear_range=shear_range,
        zoom_range=zoom_range,
        horizontal_flip=horizontal_flip,
        vertical_flip=vertical_flip,
        preprocessing_function=add_noise
    )

    train_set = train_gen.flow_from_directory(
        self.TRAIN_PATH,
        batch_size=batch_size,
        target_size=target_size,
        class_mode='categorical',
        shuffle=True
    )

    val_gen = image.ImageDataGenerator(rescale=1/255.)
    val_set = val_gen.flow_from_directory(
        self.VAL_PATH,
        batch_size=batch_size,
        target_size=target_size,
        class_mode='categorical',
        shuffle=False
    )

    test_gen = image.ImageDataGenerator(rescale=1/255.)
    test_set = test_gen.flow_from_directory(
        self.TEST_PATH,
        batch_size=batch_size,
        target_size=target_size,
        class_mode='categorical',
        shuffle=False
    )

    return train_set, val_set, test_set