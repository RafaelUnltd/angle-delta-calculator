# Total angle calculator variation

This is a simple program to calculate the total angle variation given a dataset. All samples should be included inside the /samples respository folder in .csv extension. Be sure to format each sample document like follows:

```csv

angle_value_1_1,mass_name_1
angle_value_2_1,
angle_value_3_1,
...
angle_value_n_1
angle_value_1_2,mass_name_2
angle_value_2_2,
angle_value_3_2,
...
angle_value_n_2,
angle_value_1_3,mass_name_3
angle_value_2_3,
angle_value_3_3,
...
angle_value_n_3
```

**OBS:** Ignore the first line with a line break.

# How to run the project?

- Install NodeJS with version 18+ and be sure to have the equivalent npm version installed.
- Clone this repository.

```bash
git clone https://github.com/RafaelUnltd/angle-delta-calculator.git
```

- Navigate inside the cloned folder.
- Install all the dependencies

```bash
npm install
```

- Add your .csv files to be proccessed inside the /samples folder
- Run the project with the following command:

```bash
npm run calculate
```

- Check your results inside the /results folder.